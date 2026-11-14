export default async function(sock,m,from,ctx) {
  const text=ctx.text;
  if(!text) return m.reply('Usage: .translate language | text. Supported: Urdu, Hindi, English, Arabic, French, Spanish.');
  const [lang,...parts]=text.split('|'); const source=parts.join('|').trim();
  if(!source) return m.reply('Format: .translate Urdu | Hello');
  const url=process.env.TRANSLATE_URL;
  if(!url) return m.reply('Translation API is not configured. Set TRANSLATE_URL to a LibreTranslate-compatible endpoint.');
  try {
    const r=await fetch(`${url.replace(/\/$/,'')}/translate`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q:source,source:'auto',target:lang.trim().toLowerCase(),format:'text'})});
    if(!r.ok) throw new Error('API error');
    const data=await r.json(); return m.reply(data.translatedText || 'No translation returned.');
  } catch { return m.reply('Translation service unavailable. Try again later.'); }
}
