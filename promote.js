export default async function(sock, m, from, ctx) {
  if (!ctx.isGroupAdmin) return m.reply('Admin only.'); if (!ctx.mentioned[0]) return m.reply('Tag a member.'); await sock.groupParticipantsUpdate(from, ctx.mentioned, 'promote'); return m.reply('Promoted.');
}
