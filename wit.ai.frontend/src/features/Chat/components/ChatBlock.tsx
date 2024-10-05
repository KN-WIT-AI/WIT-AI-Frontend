import { Card, Flex } from "@chakra-ui/react";
import { ChatBlockType } from "../models/chat-block-type";
import { useEffect, useState } from "react";
import { typeText } from "../logic/chat-helpers";
import { chatLetterDelay } from "../models/chat-consts";
import { ChatMessage } from "../models/chat-message";

type Props = {
  message: ChatMessage;
};

const justifyContent = {
  [ChatBlockType.User]: "flex-end",
  [ChatBlockType.Bot]: "flex-start",
};

export function ChatBlock(props: Props) {
  const [text, setText] = useState(
    props.message.type === ChatBlockType.User ? props.message.text : ""
  );

  useEffect(() => {
    if (props.message.type === ChatBlockType.Bot) {
      typeText(props.message.text, chatLetterDelay, setText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      dir={"row"}
      justifyContent={justifyContent[props.message.type]}
      marginY={"1rem"}
    >
      <Card
        padding={"0.5rem 1rem"}
        bgColor={
          props.message.type === ChatBlockType.User ? "blue.300" : undefined
        }
      >
        {text}
      </Card>
    </Flex>
  );
}
