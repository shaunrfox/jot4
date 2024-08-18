import { useEffect, useMemo, useState } from "react";

import { Editor, useEditor } from "@tiptap/react";
// import { Collaboration } from '@tiptap/extension-collaboration'
// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";

import { ExtensionKit } from "~/extensions/extension-kit";
// import { userColors, userNames } from '../lib/constants'
// import { randomElement } from '~/utils'
import { EditorUser } from "../../components/BlockEditor/types";
// import { useSidebar } from './useSidebar'
// import { initialContent } from '~/lib/data/initialContent'
import { UniqueID } from "@tiptap-pro/extension-unique-id";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  provider,
}: {
  provider?: TiptapCollabProvider | null | undefined;
}) => {
  // const leftSidebar = useSidebar()
  // const [collabState, setCollabState] = useState<WebSocketStatus>(WebSocketStatus.Connecting)

  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        provider?.on("synced", () => {
          if (editor.isEmpty) {
            // editor.commands.setContent(initialContent)
          }
        });
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        // Collaboration.configure({
        //   document: ydoc,
        // }),
        // CollaborationCursor.configure({
        //   provider,
        //   user: {
        //     name: "Shizzle",
        //     color: "#fb7185",
        //   },
        // }),
        UniqueID.configure({
          types: [
            "doc",
            "heading",
            "paragraph",
            "codeBlock",
            "image",
            "bulletList",
            "orderedList",
            "taskList",
            "taskItem",
            "table",
            "blockquote",
            "blockquoteFigure",
            "horizontalRule",
            "imageBlock",
            "columns",
          ],
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
        },
      },
    },
    [provider],
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(" ");
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;

      return { ...user, initials: initials.length ? initials : "?" };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  useEffect(() => {
    // provider?.on('status', (event: { status: WebSocketStatus }) => {
    //   setCollabState(event.status)
    // })
  }, [provider]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.editor = editor;
    }
  }, [editor]);

  // console.log("Editor:", editor);

  return { editor, characterCount };
};
