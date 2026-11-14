export default async function(sock, m, from, ctx) {
  return m.reply('📣 Broadcast is disabled to prevent unsolicited bulk messaging.');
}
