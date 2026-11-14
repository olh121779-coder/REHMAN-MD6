import fs from 'node:fs';
const file='./session/features.json';
function read(){ try{return JSON.parse(fs.readFileSync(file,'utf8'))}catch{return {}} }
export function setFeature(chat,name,value){const data=read();data[chat]??={};data[chat][name]=value;fs.mkdirSync('./session',{recursive:true});fs.writeFileSync(file,JSON.stringify(data,null,2));}
export function getFeature(chat,name){return Boolean(read()[chat]?.[name]);}
