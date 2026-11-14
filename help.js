import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply('Use .menu to view commands. Prefix: .');
}
