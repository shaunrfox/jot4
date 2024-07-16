import { BlockType } from "@prisma/client";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

import Editor from "../components/Editor";
import {
  createBlock,
  deleteAllBlocks,
  getAllBlocks,
  getBlockCount,
} from "~/models/block.server";
import { useState } from "react";

import theme, { modes } from "~/utils/theme";
import Box from "~/components/Box";
import AppHeader from "~/components/AppHeader";
import PageTitleArea from "~/components/PageTitleArea";
import { Select } from "~/components/Select";
// import { Children } from "react";

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

  console.log("BLOCKS");
  console.log(JSON.stringify(blocks));

  // console.log("BLOCKFETCHER");
  // console.log(JSON.stringify(blockFetcher));

  // console.log("BLOCKCONTENT");
  // console.log(blockContent);

  // const options = [
  //   {
  //     label: "Text",
  //     value: "text",
  //   },
  //   {
  //     label: "Quote",
  //     value: "quote",
  //   },
  //   {
  //     label: "Code",
  //     value: "code",
  //   },
  //   {
  //     label: "Image",
  //     value: "image",
  //   },
  // ];

  return (
    <>
      <PageTitleArea />
      {/* <Select options={options} /> */}
      {/* <Editor /> */}
      <Editor handleContent={setBlockContent} />
    </>
  );
}
