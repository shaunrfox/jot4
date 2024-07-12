// import { $getRoot, $getSelection } from 'lexical';
// eslint-disable-next-line
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
// import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
// import { TabIndentationPlugin } from "@lexical/react/LexicalTablePlugin";
// import { AutoLinkPlugin } from "@lexical/react/LexicalTablePlugin";
// import { MarkdownShortcutPlugin } from "@lexical/react/LexicalTablePlugin";

import EditorTheme from "./theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

import "./editor-styles.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function onError(error: Error) {
  console.error(error);
}

// function MyOnChangePlugin({
//   onChange,
// }: {
//   onChange: (payload: unknown) => void;
// }) {
//   // Access the editor through the LexicalComposerContext
//   const [editor] = useLexicalComposerContext();
//   // Wrap our listener in useEffect to handle the teardown and avoid stale references.
//   useEffect(() => {
//     // most listeners return a teardown function that can be called to clean them up.
//     return editor.registerUpdateListener(({ editorState }) => {
//       // call onChange here to pass the latest state up to the parent.
//       onChange(editorState);
//     });
//   }, [editor, onChange]);

//   return null;
// }

export function Editor({
  handleContent,
}: {
  handleContent: (payload: any) => void;
}) {
  const placeholder = "Enter some rich text...";

  const editorConfig = {
    namespace: "MyEditor",
    theme: EditorTheme,
    nodes: [],
    onError,
  };

  // const [editorState, setEditorState] = useState();

  function onChange(editorState: any) {
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    // setEditorState(JSON.stringify(editorStateJSON));
    handleContent(editorStateJSON);
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/* <ToolbarPlugin /> */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={placeholder}
              />
            }
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
          {/* <MyOnChangePlugin onChange={onChange} /> */}
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
