import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { forwardRef, Ref, useState } from "react";

type Props = {
  disabled?: boolean;
  onMessageInput?: (message: string) => void;
};

export const ChatInput = forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const [text, setText] = useState("");

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") {
        onTrigger();
      }
    }

    function onTrigger() {
      props.onMessageInput?.(text);
      setText("");
    }

    return (
      <InputGroup>
        <Input
          ref={ref}
          onKeyDown={onKeyDown}
          onChange={(e) => setText(e.target.value)}
          value={text}
          variant="outline"
          placeholder="Enter your message"
          disabled={props.disabled ?? false}
          paddingRight={'6rem'}
        />
        <InputRightElement width={"5rem"}>
          <Button
            onClick={() => onTrigger()}
            width={"100%"}
            disabled={props.disabled ?? false}
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);
