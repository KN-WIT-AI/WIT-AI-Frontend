import { useRef, useState } from "react";
import { ChatBlock } from "./components/ChatBlock";
import { ChatInput } from "./components/ChatInput";
import { ChatBlockType } from "./models/chat-block-type";
import { delayTask } from "./logic/chat-helpers";
import { chatLetterDelay } from "./models/chat-consts";
import { Flex, useToast, UseToastOptions } from "@chakra-ui/react";
import { getChatAnswer } from "./logic/chat-service";
import { ChatMessage } from "./models/chat-message";

const errorToast: UseToastOptions = {
  title: "An error occurred.",
  description: "Please try again later.",
  status: "error",
  duration: 2000,
  isClosable: true,
};

export function Chat() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  function addMessage(message: string, type: ChatBlockType) {
    setChat((chat) => {
      return [
        ...chat,
        {
          text: message,
          type: type,
        },
      ];
    });
  }

  async function focusInput() {
    await delayTask(1);
    inputRef.current?.focus();
  }

  async function scrollToInput() {
    await delayTask(1);
    inputRef.current?.scrollIntoView();
  }

  async function insertMessage(message: string) {
    setInputDisabled(true);

    addMessage(message, ChatBlockType.User);
    await scrollToInput();

    try {
      const response = await getChatAnswer("", message);
      addMessage(response, ChatBlockType.Bot);
      await scrollToInput();
      await delayTask(chatLetterDelay * response.length);
    } catch (error) {
      toast(errorToast);
      await scrollToInput();
    }

    setInputDisabled(false);
    await focusInput();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chat</h1>
      <Flex justifyContent={"flex-end"} direction={"column"} height={"100%"}>
        <Flex
          direction={"column"}
          minHeight={"75dvh"}
          justifyContent={"flex-end"}
        >
          {chat.map((message, index) => (
            <ChatBlock key={`${message.text}_${index}`} message={message} />
          ))}
        </Flex>

        <ChatInput
          ref={inputRef}
          onMessageInput={insertMessage}
          disabled={inputDisabled}
        />
      </Flex>
    </div>
  );
}
