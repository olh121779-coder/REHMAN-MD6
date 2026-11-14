import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply(`⚡ Response: ${Date.now() - (m.messageTimestamp || Math.floor(Date.now()/1000))*1000}ms (approx.)`);
}
