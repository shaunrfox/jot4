import { EmojiItem } from "@tiptap-pro/extension-emoji";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import styled from "@emotion/styled";
import { modes } from "~/utils/theme";
import { StyleProps, themeHelper } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";

import Button from "~/components/Button";
import { Panel } from "~/components/ui/Panel";
import { EmojiListProps } from "../types";
import Text from "~/components/Text";

const EmojiList = forwardRef((props: EmojiListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => setSelectedIndex(0), [props.items]);

  const selectItem = useCallback(
    (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({ name: item.name });
      }
    },
    [props],
  );

  useImperativeHandle(ref, () => {
    const scrollIntoView = (index: number) => {
      const item = props.items[index];

      if (item) {
        const node = document.querySelector(`[data-emoji-name="${item.name}"]`);

        if (node) {
          node.scrollIntoView({ block: "nearest" });
        }
      }
    };

    const upHandler = () => {
      const newIndex =
        (selectedIndex + props.items.length - 1) % props.items.length;
      setSelectedIndex(newIndex);
      scrollIntoView(newIndex);
    };

    const downHandler = () => {
      const newIndex = (selectedIndex + 1) % props.items.length;
      setSelectedIndex(newIndex);
      scrollIntoView(newIndex);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    return {
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    };
  }, [props, selectedIndex, selectItem]);

  const createClickHandler = useCallback(
    (index: number) => () => selectItem(index),
    [selectItem],
  );

  if (!props.items || !props.items.length) {
    return null;
  }

  return (
    <Panel
      sx={{
        "> div": {
          maxWidth: "18rem",
          maxHeight: "18rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {props.items.map((item: EmojiItem, index: number) => (
        <Button
          active={index === selectedIndex}
          variant="hollow"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 4,
            width: "100%",
          }}
          size="small"
          key={item.name}
          onClick={createClickHandler(index)}
          data-emoji-name={item.name}
        >
          {item.fallbackImage ? (
            <Box
              as="img"
              src={item.fallbackImage}
              sx={{ width: "1.25rem", height: "1.25rem" }}
              alt="emoji"
            />
          ) : (
            item.emoji
          )}{" "}
          <Text
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            :{item.name}:
          </Text>
        </Button>
      ))}
    </Panel>
  );
});

EmojiList.displayName = "EmojiList";

export default EmojiList;
