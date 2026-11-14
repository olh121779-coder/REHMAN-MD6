import { setFeature, getFeature } from '../../lib/features.js';
export default async function(sock, m, from, ctx) {
  if (!ctx.isOwner && !ctx.isGroupAdmin) return m.reply('Owner/group admin only.');
  const value=(ctx.args[0]||'').toLowerCase();
  if (!['on','off'].includes(value)) return m.reply('Usage: .goodbye on/off');
  setFeature(from, 'goodbye', value==='on');
  return m.reply(`goodbye: ${value.toUpperCase()}`);
}
