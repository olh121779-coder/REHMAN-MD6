import config from '../../config.js';
export default async function(sock, m, from, ctx) {
  return m.reply((await import('../../menu.js')).default());
}
