export default async function(sock, m, from, ctx) {
  if (!ctx.isGroupAdmin) return m.reply('Admin only.'); await sock.groupSettingUpdate(from,'not_announcement'); return m.reply('Group members can send messages again.');
}
