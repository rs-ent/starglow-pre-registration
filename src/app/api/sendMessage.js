export default async function handler(req, res) {
    const { chatId, message } = req.body;
  
    if (!chatId || !message) {
      return res.status(400).json({ error: "chatId and message are required." });
    }
  
    const botToken = "7404442592:AAElreWN76sLRe7LSoIDEZL-t0Xs7r6Nfgg"; // BotFather에서 제공된 토큰
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ message: "Message sent", data });
      } else {
        const error = await response.json();
        return res.status(response.status).json({ error });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }