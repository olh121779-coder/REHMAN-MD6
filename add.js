export default async function(sock, m, from, ctx) {
  if (!ctx.isGroupAdmin) return m.reply('Admin only.'); if (!ctx.args[0]) return m.reply('Usage: .add international_number'); await sock.groupParticipantsUpdate(from, [`${ctx.args[0].replace(/\\D/g,'')}@s.whatsapp.net`], 'add'); return m.reply('Request sent; WhatsApp/group privacy settings may prevent adding.');
}
