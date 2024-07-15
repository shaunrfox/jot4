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

import styled from "@emotion/styled";
import { sxPropHelper } from "~/utils/styled";
import theme, { modes } from "~/utils/theme";
import Box from "~/components/Box";
import AppHeader from "~/components/AppHeader";
import PageTitleArea from "~/components/PageTitleArea";
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

const MainContent = styled(Box)(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: "650px",
    padding: theme.space[8],
    gap: theme.space[8],
  },
  sxPropHelper
);

export default function Index() {
  // const { blocks } = useLoaderData<typeof loader>();
  // if block type = ___, return ___ component

  // const blockFetcher = useFetcher();

  // const [blockContent, setBlockContent] = useState();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppHeader />
      <MainContent>
        <PageTitleArea />
        <Editor />
        {/* <Editor handleContent={setBlockContent} /> */}
      </MainContent>
    </Box>
  );
}
