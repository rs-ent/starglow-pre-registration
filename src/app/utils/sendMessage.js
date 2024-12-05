// src/app/utils/sendMessage.js

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // 서버 사이드 환경 변수

/**
 * Telegram 사용자에게 메시지를 전송합니다.
 *
 * @param {string|number} chatId - Telegram 사용자 채팅 ID
 * @param {string} text - 전송할 메시지 텍스트
 * @param {string} photoUrl - 전송할 이미지 URL
 * @param {Object} [options={}] - 추가 메시지 옵션 (예: parse_mode, reply_markup)
 * @returns {Promise<Object>} - Telegram API 응답 데이터
 * @throws {Error} - 메시지 전송 실패 시 에러 발생
 */
export async function sendMessage(chatId, text, photoUrl, options = {}) {
  if (!BOT_TOKEN) {
    throw new Error("Telegram Bot Token is not defined.");
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

  const payload = {
    chat_id: chatId,
    photo: photoUrl, // 전송할 이미지 URL
    caption: text, // 메시지를 캡션으로 설정
    ...options,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    console.error("Telegram API error:", responseBody);
    throw new Error(`Failed to send message: ${responseBody.description || "Unknown error"}`);
  }

  return responseBody;
};

export const sendMessageToUser = async (chatId, message, photo) => {
  const response = await fetch("/api/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message, photo }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || "Failed to send message.");
  }

  return await response.json();
};