import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply(`🤖 ${config.botName}\n🌍 Worldwide: Yes\nPrefix: ${config.prefix}`);
}
