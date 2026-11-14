export default async function(sock, m, from, ctx) {
  const meta=await sock.groupMetadata(from); return m.reply(`👥 ${meta.subject}\nMembers: ${meta.participants.length}\nCreated: ${meta.creation ? new Date(meta.creation*1000).toLocaleString() : 'Unknown'}`);
}
