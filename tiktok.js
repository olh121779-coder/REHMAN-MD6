export default async function(sock,m,from,ctx) {
  if(!ctx.text) return m.reply('Usage: .tiktok paste a public link or search title.');
  return m.reply('For copyright and platform-safety reasons, this build does not download or re-upload media. Open the original platform/app and use its official sharing or offline-save feature.');
}
