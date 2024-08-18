import { Editor } from "@tiptap/core";
import "./EditorParsedContent.css";

export type EditorParsedContentProps = {
  editor: Editor;
};

const ContentToolsHeader = ({
  label,
  count,
}: {
  label: string;
  count?: string;
}) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#ffffffea",
        position: "sticky",
        top: 0,
        padding: "10px",
        borderBottom: "1px solid #ccc",
        zIndex: 1,
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "16px" }}>{label}</h2>
      {count && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            padding: "0 8px",
            backgroundColor: "#151716",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          {count}
        </div>
      )}
    </header>
  );
};

const CodeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.409 17.4139L13.1684 6.11275C13.2329 5.91885 13.4424 5.81395 13.6363 5.87845L14.3574 6.11835C14.5513 6.18285 14.6562 6.39232 14.5917 6.58622L10.8323 17.8873C10.7678 18.0812 10.5583 18.1861 10.3644 18.1216L9.64329 17.8817C9.44939 17.8172 9.34449 17.6078 9.409 17.4139Z"
      fill="currentColor"
    />
    <path
      d="M8.51999 15.3486L8.90999 14.9586C9.00999 14.8586 9.01999 14.6986 8.91999 14.5886L6.61999 12.0086L8.91999 9.42861C9.01999 9.31861 9.00999 9.15861 8.90999 9.05861L8.51999 8.66861C8.40999 8.55861 8.23999 8.55861 8.13999 8.66861L4.79999 12.0086L8.13999 15.3486C8.24999 15.4586 8.41999 15.4586 8.51999 15.3486Z"
      fill="currentColor"
    />
    <path
      d="M15.48 15.3486L15.09 14.9586C14.99 14.8586 14.98 14.6986 15.08 14.5886L17.38 12.0086L15.08 9.42861C14.98 9.31861 14.99 9.15861 15.09 9.05861L15.48 8.66861C15.59 8.55861 15.76 8.55861 15.86 8.66861L19.2 12.0086L15.86 15.3486C15.75 15.4586 15.58 15.4586 15.48 15.3486Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.07 12L16.4 8.67C16.53 8.54 16.53 8.33 16.4 8.19L15.81 7.6C15.68 7.47 15.47 7.47 15.33 7.6L12 10.93L8.67 7.6C8.54 7.47 8.33 7.47 8.19 7.6L7.6 8.19C7.47 8.32 7.47 8.53 7.6 8.67L10.93 12L7.6 15.33C7.47 15.46 7.47 15.67 7.6 15.81L8.19 16.4C8.32 16.53 8.53 16.53 8.67 16.4L12 13.07L15.33 16.4C15.46 16.53 15.67 16.53 15.81 16.4L16.4 15.81C16.53 15.68 16.53 15.47 16.4 15.33L13.07 12Z"
      fill="currentColor"
    />
  </svg>
);

let myIndex = 0;

const NodeComponent = (node: any, ResolvePos: number, key: string) => {
  const nodeType = node.type.name;
  const nodeId = node.attrs.id;
  const nodeContent = JSON.stringify(node, null, 2);

  // console.log(ResolvePos, '.', nodeType, '.', nodeId)

  const nodeElement = (
    <div
      key={key}
      data-index={ResolvePos}
      className="node-element"
      style={{ opacity: nodeId ? 1 : 0.5 }}
    >
      <details className="node-details">
        <summary className="node-header">
          <div className="node-index">{ResolvePos}</div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div style={{ fontWeight: "bold" }}>{nodeType}</div>
            <div style={{ fontSize: "0.8em" }}>{nodeId}</div>
          </div>
          <div className="code-icons">
            <CodeIcon />
            <CloseIcon />
          </div>
        </summary>
        <pre className="node-content">
          <code>{nodeContent}</code>
        </pre>
      </details>
    </div>
  );

  myIndex += 1;

  return nodeElement;
};

const FullContentJson = ({ editor }: { editor: Editor }) => (
  <details
    style={{
      display: "flex",
      padding: "10px 20px",
      backgroundColor: "#f5f5f5",
      marginTop: "10px",
      borderRadius: "5px",
    }}
  >
    <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
      Full JSON
    </summary>
    <pre
      style={{
        backgroundColor: "#404040",
        fontSize: "10px",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "100%",
        overflow: "auto",
        marginTop: "10px",
      }}
    >
      <code>{JSON.stringify(editor.state.doc, null, 2)}</code>
    </pre>
  </details>
);

const EditorParsedContent = ({ editor }: EditorParsedContentProps) => {
  const nodeElements: JSX.Element[] = [];

  editor.state.doc.content.forEach(
    (node: any, _pos: number, ResolvePos: number) => {
      const key = `${ResolvePos}-${node.attrs.id || ""}`;
      nodeElements.push(NodeComponent(node, ResolvePos, key));
    },
  );

  // const thisEditor = useCurrentEditor()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: "60px",
        bottom: "10px",
        right: "10px",
        width: "400px",
        zIndex: 10000,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        fontSize: "12px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ContentToolsHeader
        label="Nodes"
        count={nodeElements.length.toString()}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "0 10px 20px 10px",
          overflow: "auto",
          counterReset: "section",
        }}
      >
        {nodeElements}
        {/* {editor && <FullContentJson editor={editor} />} */}
      </div>
    </div>
  );
};

EditorParsedContent.displayName = "EditorParsedContent";
export default EditorParsedContent;
