import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply(`⏱️ Uptime: ${Math.floor(process.uptime()/60)} minutes`);
}
