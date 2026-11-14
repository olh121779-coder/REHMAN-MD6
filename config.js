import 'dotenv/config';

export default {
  botName: 'REHMAN-MD',
  ownerName: 'REHMAN',
  prefix: '.',
  pairName: 'REHMANMD',
  worldwide: true,
  ownerNumber: (process.env.OWNER_NUMBER || '').replace(/\\D/g, ''),
  port: Number(process.env.PORT || 3000),
  timezone: process.env.TZ || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  language: 'English + Roman Urdu + Hindi',
  sessionDir: process.env.SESSION_DIR || './session',
  pairRateLimit: Number(process.env.PAIR_RATE_LIMIT || 5)
};
