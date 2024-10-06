import { ChatMessage } from "../models/chat-message";

const apiBaseUrl = "http://127.0.0.1:8080/api";

async function postRequest(endpoint: string, body: unknown) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

async function getRequest(endpoint: string) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`);
  return await response.json();
}

export async function getWelcomeMessage() {
  return await getRequest('/get-welcome-message')
}

export async function getChatAnswer(
  chatId: string,
  message: string
): Promise<string> {
  return await postRequest("/get-answer", {
    "content": message,
    "chat_id": chatId
  });
}

export async function getChatHistory(chatId: string): Promise<ChatMessage[]> {
  return await postRequest("/get-chat", {
    "chat_id": chatId
  });
}


