import { Editor } from "@tiptap/core";
import Heading from "~/components/Heading";
import Box from "~/components/Box";
import ChevronDown from "~/components/icons/ChevronDown";

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
      <Heading as="h2">{label}</Heading>
      {count && (
        <Box
          sx={{
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
        </Box>
      )}
    </header>
  );
};

let myIndex = 0;

const NodeComponent = (node: any, ResolvePos: number, key: string) => {
  const nodeType = node.type.name;
  const nodeId = node.attrs.id;
  const nodeContent = JSON.stringify(node, null, 2);

  // console.log(ResolvePos, '.', nodeType, '.', nodeId)

  const nodeElement = (
    <Box
      key={key}
      data-index={ResolvePos}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "5px",
        marginTop: "10px",
        backgroundColor: "#e8f1ee",
        opacity: nodeId ? 1 : 0.5,
      }}
    >
      <Box
        as="details"
        sx={{
          height: "auto",
          marginBottom: "0",
          borderRadius: "5px",
          overflow: "hidden",
          "&[open]": {
            marginBottom: "10px",
            svg: {
              transform: "rotate(180deg)",
              transformOrigin: "center",
            },
          },
        }}
      >
        <Box
          as="summary"
          sx={{
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            width: "100%",
            listStyle: "none",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 1,
            backgroundColor: "#e8f1ee",
            "&:hover": {
              backgroundColor: "#d4e5df",
            },
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              padding: "2px 6px",
              backgroundColor: "#03242416",
              borderRadius: "3px",
            }}
          >
            {ResolvePos}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box sx={{ fontWeight: "bold" }}>{nodeType}</Box>
            <Box sx={{ fontSize: "0.8em" }}>{nodeId}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              minWidth: "24px",
              height: "24px",
            }}
          >
            <ChevronDown />
          </Box>
        </Box>
        <Box
          as="pre"
          sx={{
            backgroundColor: "#404040",
            fontSize: "10px",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            margin: "0 10px",
          }}
        >
          <code>{nodeContent}</code>
        </Box>
      </Box>
    </Box>
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
