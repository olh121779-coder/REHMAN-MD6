export default async function(sock, m, from, ctx) {
  if (!ctx.args[0]) return m.reply('Usage: .join https://chat.whatsapp.com/INVITE'); { const code=ctx.args[0].split('/').pop(); const r=await sock.groupAcceptInvite(code); return m.reply(`Joined: ${r}`); }
}
