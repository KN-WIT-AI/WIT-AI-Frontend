import { Card, Flex, Link } from "@chakra-ui/react";
import { ChatBlockType } from "../models/chat-block-type";
import { useEffect, useState } from "react";
import { typeText } from "../logic/chat-helpers";
import { chatLetterDelay } from "../models/chat-consts";
import { ChatMessage } from "../models/chat-message";
import reactStringReplace from "react-string-replace";

type Props = {
  message: ChatMessage;
};

const justifyContent = {
  [ChatBlockType.User]: "flex-start",
  [ChatBlockType.Bot]: "flex-end",
};

const formLink =
  "https://docs.google.com/forms/d/1xQOhAcpt8QolxyTd9mXOCkjesMMTP-JkwRk7iRHKkGw";

export function ChatBlock(props: Props) {
  const [text, setText] = useState(
    props.message.type === ChatBlockType.Bot && props.message.showAnimation
      ? ""
      : props.message.text
  );

  useEffect(() => {
    if (
      props.message.type === ChatBlockType.Bot &&
      props.message.showAnimation
    ) {
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
        maxWidth={["80%", "30%"]}
        bgColor={
          props.message.type === ChatBlockType.User ? "blue.300" : undefined
        }
      >
        {reactStringReplace(text, "[placeLinkHere]", (match) => (
          <Link
            key={match}
            href={formLink}
            target="_blank"
            rel="noreferrer"
            color={"blue.300"}
            fontWeight={"bold"}
          >
            Link do formularza
          </Link>
        ))}
      </Card>
    </Flex>
  );
}
