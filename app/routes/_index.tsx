import { BlockType } from "@prisma/client";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

import { Editor } from "../components/Editor/Editor";
import {
  createBlock,
  deleteAllBlocks,
  getAllBlocks,
  getBlockCount,
} from "~/models/block.server";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Jot App" },
    { name: "description", content: "Welcome to Jot!" },
  ];
};

export async function loader() {
  return json({
    blocks: await getAllBlocks(),
  });
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

  if (intent === "deleteAll") {
    // DEMONSTRATION PURPOSES ONLY
    await deleteAllBlocks();
  }

  return null;
}

export default function Index() {
  const { blocks } = useLoaderData<typeof loader>();
  // if block type = ___, return ___ component

  const blockFetcher = useFetcher();

  const [blockContent, setBlockContent] = useState();

  return (
    <>
      <h1>Home</h1>
      <h3>Blocks ({blocks.length})</h3>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: "50%" }}>
          <blockFetcher.Form method="POST">
            <input
              type="hidden"
              name="blockContent"
              value={JSON.stringify(blockContent)}
            />
            <label>
              <input type="radio" name="blockType" value="TEXT" />
              TEXT
            </label>
            <label>
              <input type="radio" name="blockType" value="CODE" />
              CODE
            </label>
            <label>
              <input type="radio" name="blockType" value="EVENT" />
              EVENT
            </label>
            <button name="intent" value="create">
              Add block
            </button>
            {/* DEMONSTRATION PURPOSES ONLY */}
            <button name="intent" value="deleteAll">
              Delete all blocks
            </button>
          </blockFetcher.Form>
          <ul
            style={{
              height: "500px",
              overflowY: "auto",
              border: "1px solid black",
            }}
          >
            {blocks.map((block) => (
              <li key={block.id}>
                <pre>
                  <code>{JSON.stringify(block, null, 4)}</code>
                </pre>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flexBasis: "50%" }}>
          <Editor handleContent={setBlockContent} />
        </div>
      </div>
    </>
  );
}
