export default async function(sock,m,from,ctx) {
  const q=ctx.text;
  if(!q) return m.reply('Usage: .img your question');
  const endpoint=process.env.AI_API_URL, key=process.env.AI_API_KEY;
  if(!endpoint || !key) return m.reply('AI is not configured yet. Operator: set AI_API_URL and AI_API_KEY in environment variables.');
  try {
    const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},body:JSON.stringify({prompt:q,language:'English + Roman Urdu + Hindi'})});
    if(!r.ok) throw new Error('API error');
    const data=await r.json(); return m.reply(data.answer || data.text || 'No response returned.');
  } catch { return m.reply('AI service unavailable. Please try again later.'); }
}
