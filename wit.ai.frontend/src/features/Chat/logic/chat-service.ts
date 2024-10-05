import { ChatMessage } from "../models/chat-message";

export async function getChatAnswer(
  chatId: string,
  message: string
): Promise<string> {
  const response = await fetch("http://127.0.0.1:8080/api/get-answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "content": message,
      "chat_id": chatId
    }),
  });

  return await response.json();
}

export async function getChatHistory(chatId: string): Promise<ChatMessage[]> {
  const response = await fetch("http://127.0.0.1:8080/api/get-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "chat_id": chatId
    }),
  });

  return await response.json();
}
