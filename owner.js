import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply(`👑 Owner: ${config.ownerName}\nContact is configured by the bot operator.`);
}
