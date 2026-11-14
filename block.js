export default async function(sock, m, from, ctx) {
  if (!ctx.args[0]) return m.reply('Usage: .block number'); return sock.updateBlockStatus(`${ctx.args[0].replace(/\\D/g,'')}@s.whatsapp.net`, 'block').then(()=>m.reply('Blocked.'));
}
