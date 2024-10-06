import { useEffect, useRef, useState } from "react";
import { ChatBlock } from "./components/ChatBlock";
import { ChatInput } from "./components/ChatInput";
import { ChatBlockType } from "./models/chat-block-type";
import { delayTask, uuidv4 } from "./logic/chat-helpers";
import { chatLetterDelay } from "./models/chat-consts";
import {
  Button,
  Flex,
  SkeletonCircle,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { getChatAnswer, getChatHistory } from "./logic/chat-service";
import { ChatMessage } from "./models/chat-message";

const errorToast: UseToastOptions = {
  title: "An error occurred.",
  description: "Please try again later.",
  status: "error",
  duration: 2000,
  isClosable: true,
};

const CHAT_ID_LS_KEY = "chatId";

export function Chat() {
  const [chatId, setChatId] = useState(
    localStorage.getItem(CHAT_ID_LS_KEY) || ""
  );
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  async function loadChat() {
    try {
      const chatHistory = await getChatHistory(chatId);
      setChat(chatHistory);
      await scrollToInput();
      await focusInput();
    } catch (error) {
      toast(errorToast);
    }
  }

  function resetChat() {
    localStorage.removeItem(CHAT_ID_LS_KEY);
    const guid = uuidv4();
    localStorage.setItem(CHAT_ID_LS_KEY, guid);
    setChatId(guid);
    setChat([]);
  }

  useEffect(() => {
    if (chatId === "") {
      resetChat();
    }

    loadChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addMessage(message: string, type: ChatBlockType) {
    setChat((chat) => {
      return [
        ...chat,
        {
          text: message,
          type: type,
          showAnimation: type === ChatBlockType.Bot,
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

    setWaiting(true);
    addMessage(message, ChatBlockType.User);
    await scrollToInput();

    try {
      const response = await getChatAnswer(chatId, message);
      addMessage(response, ChatBlockType.Bot);
      setWaiting(false);
      await scrollToInput();
      await delayTask(chatLetterDelay * response.length);
    } catch (error) {
      setWaiting(false);
      toast(errorToast);
      await scrollToInput();
    }

    setInputDisabled(false);
    await focusInput();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => resetChat()}>Clear</Button>
      <h1>Chat</h1>
      <Flex justifyContent={"flex-end"} direction={"column"} height={"100%"}>
        <Flex
          direction={"column"}
          minHeight={"75dvh"}
          justifyContent={"flex-end"}
        >
          {chat.map((message, index) => (
            <ChatBlock key={index} message={message} />
          ))}
          {waiting && (
            <Flex gap={"0.5rem"} paddingY={"1rem"} justifyContent={"center"}>
              <SkeletonCircle size="4" />
              <SkeletonCircle size="4" />
              <SkeletonCircle size="4" />
            </Flex>
          )}
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
