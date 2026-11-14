import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import crypto from 'node:crypto';
import pino from 'pino';
import makeWASocket, { useMultiFileAuthState, Browsers } from '@whiskeysockets/baileys';
import config from '../config.js';
import { attachBot } from '../case.js';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const attempts=new Map();
const active=new Map();
app.use(express.json({limit:'10kb'}));
app.use(express.static(__dirname));
app.get('/api/health',(_,res)=>res.json({ok:true,bot:config.botName,worldwide:true}));
app.post('/api/pair',async(req,res)=>{
  const ip=req.ip || 'unknown';
  const now=Date.now();
  const recent=(attempts.get(ip)||[]).filter(t=>now-t<60000);
  if(recent.length>=config.pairRateLimit) return res.status(429).json({error:'Too many requests. Wait one minute.'});
  recent.push(now);attempts.set(ip,recent);
  const number=String(req.body?.number||'').replace(/\D/g,'');
  if(number.length<7 || number.length>15) return res.status(400).json({error:'Enter a valid international phone number including country code.'});
  try{
    let entry=active.get(number);
    if(!entry){
      const id=crypto.createHash('sha256').update(number).digest('hex').slice(0,18);
      const sessionPath=path.resolve(config.sessionDir,`pair-${id}`);
      fs.mkdirSync(sessionPath,{recursive:true});
      const {state,saveCreds}=await useMultiFileAuthState(sessionPath);
      if(state.creds.registered) return res.status(409).json({error:'This number already has a saved linked session. The bot reconnects automatically after restart.'});
      const sock=makeWASocket({auth:state,logger:pino({level:'silent'}),printQRInTerminal:false,browser:Browsers.ubuntu(config.pairName)});
      sock.ev.on('creds.update',saveCreds);
      attachBot(sock);
      entry={sock,created:now,sessionPath};active.set(number,entry);
      sock.ev.on('connection.update',({connection})=>{if(connection==='close') active.delete(number);});
    }
    const code=await entry.sock.requestPairingCode(number);
    return res.json({code:code.match(/.{1,4}/g)?.join('-')||code,deviceName:config.pairName,message:'Enter this code in WhatsApp > Linked Devices > Link with phone number.'});
  }catch(err){console.error('Pairing error:',err);active.delete(number);return res.status(500).json({error:'Could not create a pairing code. Check server logs and try again.'});}
});
export async function createWebServer(){
  return new Promise(resolve=>{
    const server=app.listen(config.port,'0.0.0.0',()=>{console.log(`REHMAN-MD website listening on ${config.port}`);resolve(server);});
  });
}
