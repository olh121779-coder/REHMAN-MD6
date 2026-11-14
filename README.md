# REHMAN-MD — Worldwide WhatsApp MD Bot

**THIS IS POWER OF REHMAN💀 — WORLDWIDE BOT**

## Requirements
- Node.js 20+
- A WhatsApp account you control
- A persistent Node.js host for the WhatsApp WebSocket

## Run
1. Copy `.env.example` to `.env` and set `OWNER_NUMBER` in international format without `+`.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`, select country code, enter the rest of your number, and request a pairing code.
5. On WhatsApp: **Linked Devices → Link with phone number**, then enter the code.

The phone number sent to `/api/pair` must include the country calling code. The website combines the selected dial code with the local number and validates a 7–15 digit international number.

## Commands
Prefix: `.`. Use `.menu`. There are 100 command routes in separate files.
- Owner commands require `OWNER_NUMBER`.
- Group moderation commands require group admin permissions.
- Bulk broadcast is intentionally disabled.
- AI and translation commands require configured API endpoints.
- DP commands provide Pinterest search links rather than inventing unverified CDN image URLs.
- Media downloading/re-uploading is intentionally not implemented; use official platform sharing/offline features.
- Some WhatsApp profile operations are not available through the supported Baileys interface.

## Worldwide settings
Country calling codes are selected on the website. Phone numbers are normalized to digits and accept international E.164-style lengths. The server uses its configured/runtime timezone. The pairing API accepts international numbers independently of the server timezone.

## Hosting
Use Render, Railway, Koyeb, Replit, Docker, a VPS, or a persistent Node panel. Keep the `session/` directory on persistent storage and never publish it.
Vercel and Netlify are suitable for static frontend hosting only; their serverless functions are not a suitable home for a permanently connected Baileys socket. This project uses one Express process for both website and pairing API.

## Security
- Never share pairing codes or session files.
- Restrict access to the pairing page/API before exposing it publicly.
- Configure HTTPS through your host/reverse proxy.
- Pair endpoint has basic per-IP rate limiting. Add a persistent shared rate limiter and CAPTCHA before public production use.
- This project is unofficial and is not affiliated with WhatsApp.
