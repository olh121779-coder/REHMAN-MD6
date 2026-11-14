export default async function(sock, m, from, ctx) {
  if (!from.endsWith('@g.us')) return m.reply('Group only.'); await sock.groupLeave(from);
}
