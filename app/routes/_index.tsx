import { BlockType } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

import Editor from "../components/Editor";
import {
  createBlock,
  updateBlock,
  deleteBlock,
  deleteAllBlocks,
  getAllBlocks,
  getBlockCount,
} from "~/models/block.server";
import { useState } from "react";

// import theme, { modes } from "~/utils/theme";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import { Select } from "~/components/Select";
import { IconButton } from "~/components/Button";
import Trash from "~/components/icons/Trash";

export async function loader() {
  const blocks = await getAllBlocks();
  return json({ blocks });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent"));

  const blockType = String(form.get("blockType")) as BlockType;
  const content = JSON.parse(String(form.get("blockContent")));

  if (intent === "create") {
    const order = await getBlockCount();

    await createBlock({
      type: blockType,
      content,
      order,
    });
  }
  if (intent === "update") {
    const blockId = String(form.get("blockId"));
    await updateBlock(blockId, content);
  }

  if (intent === "delete") {
    const blockId = String(form.get("blockId"));
    await deleteBlock(blockId);
  }

  if (intent === "deleteAll") {
    // DEMONSTRATION PURPOSES ONLY
    await deleteAllBlocks();
  }

  return null;
}

export default function Index() {
  const { blocks } = useLoaderData<typeof loader>();
  const deleteFetcher = useFetcher();

  // if block type = ___, return ___ component

  const blockFetcher = useFetcher();

  const [blockContent, setBlockContent] = useState();

  const handleDeleteBlock = (blockId: string) => {
    console.log(blockId);
    deleteFetcher.submit({ intent: "delete", blockId }, { method: "POST" });
  };

  // console.log("BLOCKS");
  // console.log(JSON.stringify(blocks));

  // console.log("BLOCKFETCHER");
  // console.log(JSON.stringify(blockFetcher));

  // console.log("BLOCKCONTENT");
  // console.log(blockContent);

  const options = [
    {
      subHeader: "Options",
    },
    {
      divider: true,
    },
    {
      label: "Text",
      value: "text",
      iconLeft: Trash,
      hotKeys: ["ctrl", "t"],
    },
    {
      label: "Quote",
      value: "quote",
      iconLeft: Trash,
      hotKeys: ["ctrl", "t"],
    },
    {
      label: "Code",
      value: "code",
      iconLeft: Trash,
      hotKeys: ["ctrl", "t"],
    },
    {
      label: "Image",
      value: "image",
      iconLeft: Trash,
      hotKeys: ["ctrl", "t"],
    },
  ];

  const [value, setValue] = useState(options[0]);

  return (
    <>
      <PageTitleArea />
      {/* <Select options={options} value={value} onChange={(o) => setValue(o)} /> */}
      <Editor />
      {/* <Editor handleContent={setBlockContent} /> */}
      <Box
        sx={{
          position: "fixed",
          top: "50px",
          left: 0,
          bottom: "50px",
          width: "300px",
          zIndex: 1000,
        }}
      >
        <ol>
          {blocks.map((block) => (
            <li key={block.id} style={{ fontSize: ".8rem" }}>
              {block.id}: {block.type}
              {/* Button to delete block here. */}
              <IconButton onClick={() => handleDeleteBlock(block.id)}>
                <Trash />
              </IconButton>
            </li>
          ))}
        </ol>
      </Box>
    </>
  );
}
