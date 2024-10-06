import { useEffect, useRef, useState } from "react";
import { ChatBlock } from "./components/ChatBlock";
import { ChatInput } from "./components/ChatInput";
import { ChatBlockType } from "./models/chat-block-type";
import { delayTask, uuidv4 } from "./logic/chat-helpers";
import { chatLetterDelay } from "./models/chat-consts";
import {
  Button,
  Divider,
  Flex,
  Heading,
  SkeletonCircle,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import {
  getChatAnswer,
  getChatHistory,
  getWelcomeMessage,
} from "./logic/chat-service";
import { ChatMessage } from "./models/chat-message";

const errorToast: UseToastOptions = {
  title: "An error occurred.",
  description: "Please try again later.",
  status: "error",
  duration: 2000,
  isClosable: true,
};

const chatIdLsKey = "chatId";

export function Chat() {
  const [chatId, setChatId] = useState(localStorage.getItem(chatIdLsKey) || "");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  async function getBotWelcomeMessage(): Promise<ChatMessage> {
    setWaiting(true);
    const welcomeMessage = await getWelcomeMessage();
    setWaiting(false);
    return {
      text: welcomeMessage,
      type: ChatBlockType.Bot,
      showAnimation: true,
    };
  }

  async function loadChat() {
    try {
      const chatHistory = await getChatHistory(chatId);
      if (chatHistory.length > 0) {
        setChat(chatHistory);
        await scrollToInput();
        await focusInput();
      } else {
        await putWelcomeMessage();
      }
    } catch (error) {
      toast(errorToast);
    }
  }

  async function putWelcomeMessage(){
    const welcomeMessage = await getBotWelcomeMessage();
    setInputDisabled(true);
    setChat([welcomeMessage]);
    await delayTask(chatLetterDelay * welcomeMessage.text.length);
    setInputDisabled(false);
    await scrollToInput();
    await focusInput();
  }

  async function resetChat() {
    localStorage.removeItem(chatIdLsKey);
    const guid = uuidv4();
    localStorage.setItem(chatIdLsKey, guid);
    setChatId(guid);
    await putWelcomeMessage();
  }

  useEffect(() => {
    if (chatId === "") {
      resetChat();
    } else {
      loadChat();
    }

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
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Heading>Chat</Heading>
        <Button onClick={() => resetChat()}>Clear</Button>
      </Flex>
      <Flex marginY={"2rem"}>
        <Divider />
      </Flex>
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
