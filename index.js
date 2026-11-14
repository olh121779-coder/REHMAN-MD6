import 'dotenv/config';
import makeWASocket, { useMultiFileAuthState, DisconnectReason, Browsers } from '@whiskeysockets/baileys';
import pino from 'pino';
import config from './config.js';
import { attachBot } from './case.js';
import { createWebServer } from './web/server.js';
import fs from 'node:fs';

const starting=new Set();
async function startBot(sessionPath=config.sessionDir){
  if(starting.has(sessionPath)) return;
  starting.add(sessionPath);
  try {
    fs.mkdirSync(sessionPath,{recursive:true});
    const {state,saveCreds}=await useMultiFileAuthState(sessionPath);
    const sock=makeWASocket({auth:state,logger:pino({level:'silent'}),printQRInTerminal:false,
      browser:Browsers.ubuntu(config.pairName)});
    sock.ev.on('creds.update',saveCreds);
    attachBot(sock);
    sock.ev.on('connection.update',({connection,lastDisconnect})=>{
      if(connection==='open') console.log('REHMAN-MD connected.');
      if(connection==='close'){
        starting.delete(sessionPath);
        const code=lastDisconnect?.error?.output?.statusCode;
        if(code!==DisconnectReason.loggedOut) setTimeout(()=>startBot(sessionPath),3000);
        else console.error('Session logged out. Re-pair from website.');
      }
    });
  } catch(e){starting.delete(sessionPath);console.error('Bot startup failed:',e);}
}
await createWebServer();
const pairedDirs=fs.existsSync(config.sessionDir) ? fs.readdirSync(config.sessionDir,{withFileTypes:true}).filter(x=>x.isDirectory() && x.name.startsWith('pair-')).map(x=>`${config.sessionDir}/${x.name}`) : [];
if(pairedDirs.length) { for (const dir of pairedDirs) await startBot(dir); }
else await startBot();
