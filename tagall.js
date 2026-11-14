export default async function(sock, m, from, ctx) {
  if (!ctx.isGroupAdmin) return m.reply('Admin only.'); const meta=await sock.groupMetadata(from); return sock.sendMessage(from,{text:meta.participants.map(p=>'@'+p.id.split('@')[0]).join(' ')+'\n'+(ctx.text||'Group notice'),mentions:meta.participants.map(p=>p.id)});
}
