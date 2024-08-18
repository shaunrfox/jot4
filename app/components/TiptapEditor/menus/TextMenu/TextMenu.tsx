import { Toolbar } from "~/components/ui/Toolbar";
import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { BubbleMenu, Editor } from "@tiptap/react";
import { memo, useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Surface } from "~/components/ui/Surface";
import { ColorPicker } from "~/components/TiptapEditor/panels";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import { EditLinkPopover } from "./components/EditLinkPopover";
import { ContentTypePicker } from "./components/ContentTypePicker";
import Bold from "~/components/icons/Bold";
import Italic from "~/components/icons/Italic";
import Underline from "~/components/icons/Underline";
import Strike from "~/components/icons/Strike";
import CodeInline from "~/components/icons/CodeInline";
import Code from "~/components/icons/Code";
import Highlight from "~/components/icons/Highlight";
import CharacterColor from "~/components/icons/CharacterColor";
import AlignLeft from "~/components/icons/AlignLeft";
import AlignCenter from "~/components/icons/AlignCenter";
import AlignRight from "~/components/icons/AlignRight";
import Rule from "~/components/Rule";
import ChevronDown from "~/components/icons/ChevronDown";
import ChevronUp from "~/components/icons/ChevronUp";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  console.log("TextMenu rendering");

  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleColorChange = useCallback(
    (color: string, type: "text" | "highlight") => {
      if (type === "highlight") {
        commands.onChangeHighlight(color);
      } else {
        commands.onChangeColor(color);
      }
    },
    [commands],
  );

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: "top-start",
        },
        maxWidth: "calc(-16px + 100vw)",
      }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <Toolbar.Wrapper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          maxWidth: 500,
        }}
      >
        <MemoContentTypePicker options={blockOptions} />
        <Rule orientation="vertical" />
        <Popover.Root onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <MemoButton
              tooltip="Align text"
              active={isOpen}
              sx={{ display: "flex", alignItems: "center", gap: 0 }}
            >
              {states.isAlignCenter ? (
                <AlignCenter />
              ) : states.isAlignRight ? (
                <AlignRight />
              ) : (
                <AlignLeft />
              )}
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content asChild>
            <Toolbar.Wrapper>
              <MemoButton
                tooltip="Align left"
                tooltipShortcut={["⇧", "⌘", "L"]}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <AlignLeft />
              </MemoButton>
              <MemoButton
                tooltip="Align center"
                tooltipShortcut={["⇧", "⌘", "E"]}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <AlignCenter />
              </MemoButton>
              <MemoButton
                tooltip="Align right"
                tooltipShortcut={["⇧", "⌘", "R"]}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <AlignRight />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
        <Rule orientation="vertical" />
        <MemoButton
          tooltip="Bold"
          tooltipShortcut={["⌘", "B"]}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Bold />
        </MemoButton>
        <MemoButton
          tooltip="Italic"
          tooltipShortcut={["⌘", "I"]}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Italic />
        </MemoButton>
        <MemoButton
          tooltip="Underline"
          tooltipShortcut={["⌘", "U"]}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Underline />
        </MemoButton>
        <MemoButton
          tooltip="Strikehrough"
          tooltipShortcut={["⌘", "⇧", "S"]}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Strike />
        </MemoButton>
        <MemoButton
          tooltip="Code"
          tooltipShortcut={["⌘", "E"]}
          onClick={commands.onCode}
          active={states.isCode}
        >
          <CodeInline />
        </MemoButton>
        <MemoButton tooltip="Code block" onClick={commands.onCodeBlock}>
          <Code />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Rule orientation="vertical" />
        <MemoColorPicker
          color={states.currentColor}
          onChange={(color) => handleColorChange(color, "text")}
        />
        <MemoColorPicker
          color={states.currentHighlight}
          onChange={(color) => handleColorChange(color, "highlight")}
          type="highlight"
        />
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
