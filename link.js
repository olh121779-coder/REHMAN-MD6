export default async function(sock, m, from, ctx) {
  const meta=await sock.groupMetadata(from); if (!ctx.isGroupAdmin) return m.reply('Admin only.'); const code=await sock.groupInviteCode(from); return m.reply(`https://chat.whatsapp.com/${code}`);
}
