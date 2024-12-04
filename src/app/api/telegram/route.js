// src/app/api/telegram.js

import { saveData } from "../../firebase/fetch"; // Firebase Firestore 초기화
import { sendMessage } from "../../utils/sendMessage"; // 유틸리티 함수 임포트

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message || !message.text) {
      return res.status(400).json({ error: "Invalid message format." });
    }

    const chatId = message.chat.id;
    const text = message.text;

    if (text.startsWith("/start")) {
      const referrerId = text.split(" ")[1] || null; // 초대자 ID 추출

      console.log(`User ${chatId} was invited by ${referrerId}`);

      // 데이터베이스에 저장
      await saveToDatabase(chatId, referrerId);

      // 환영 메시지 전송
      try {
        await sendMessage(
          chatId,
          `🌟 Welcome to Starglow Protocol! 🚀
          
You were invited by ${referrerId || "an anonymous friend"}. 🙌

🚀 *LET THEM GLOW!* 🚀

✨ Stay tuned for more updates from the Starglow Team!

🔗 Follow us for the latest news and let the glow shine brighter!`
        );
        console.log("Welcome message sent to user.");
      } catch (error) {
        console.error("Error sending welcome message:", error);
      }

      return res.status(200).json({ status: "success" });
    }

    return res.status(200).json({ status: "ignored" });
  }

  res.status(405).json({ error: "Method not allowed" });
}

// 데이터베이스 저장 함수
async function saveToDatabase(chatId, referrerId) {
  const registrationData = {
    chatId,
    invitedBy: referrerId,
    joinedAt: new Date(),
  };

  await saveData("users", registrationData, chatId.toString());
}