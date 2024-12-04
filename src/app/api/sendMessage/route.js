import { NextResponse } from "next/server";
import { sendMessage } from "../../utils/sendMessage";

export async function POST(request) {
  try {
    const body = await request.json(); // 요청의 JSON 데이터를 파싱
    const { chatId, message } = body;

    // 유효성 검사
    if (!chatId || !message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid input", details: "chatId and message are required." },
        { status: 400 }
      );
    }

    // Telegram 메시지 전송
    const response = await sendMessage(chatId, message, { parse_mode: "Markdown" });

    return NextResponse.json({ message: "Message sent successfully", data: response });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}