export default async function(sock, m, from, ctx) {
  if (!ctx.isGroupAdmin) return m.reply('Admin only.'); await sock.groupSettingUpdate(from,'announcement'); return m.reply('Group set to admins-only.');
}
