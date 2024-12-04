// scripts/webhook-setup.js

import fetch from 'node-fetch';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = 'https://starglow-pre-registration.vercel.app/api/telegram';

async function setWebhook() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: WEBHOOK_URL }),
  });

  const data = await response.json();
  if (data.ok) {
    console.log("Webhook set successfully.");
  } else {
    console.error("Failed to set webhook:", data);
  }
}

setWebhook();