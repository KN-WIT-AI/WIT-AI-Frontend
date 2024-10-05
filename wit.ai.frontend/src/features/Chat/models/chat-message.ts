import { ChatBlockType } from "./chat-block-type";

export interface ChatMessage {
  text: string;
  type: ChatBlockType;
}