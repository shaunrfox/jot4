import { useCallback, useState } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
// import { TiptapCollabProvider } from "@hocuspocus/provider";
import Box from "~/components/Box";
import Page from "~/components/Page";
import * as PageService from "~/services/page.server";
import * as BlockService from "~/services/block.server";
import { BlockType } from "@prisma/client";

export async function loader() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // This uses local timezone

  let todayPage = await PageService.getPageByDate(today);

  if (!todayPage) {
    todayPage = await PageService.createPage({
      title: `Journal for ${today.toISOString().split("T")[0]}`,
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "",
              },
            ],
          },
        ],
      }),
      date: today,
    });
  }

  const recentPages = await PageService.getRecentPages(7);

  return json({ todayPage, recentPages });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent"));

  switch (intent) {
    case "updatePage": {
      const pageId = String(form.get("pageId"));
      const content = String(form.get("content"));
      const dateString = String(form.get("date"));

      if (!pageId || pageId === "null") {
        throw new Error("Invalid page ID");
      }

      const updateData: { content?: string; date?: Date } = {};
      if (content) updateData.content = content;
      if (dateString) updateData.date = new Date(dateString);

      await PageService.updatePage(pageId, updateData);
      break;
    }
    case "createPage": {
      const title = String(form.get("title"));
      const content = String(form.get("content"));
      await PageService.createPage({ title, content });
      break;
    }
    case "create": {
      const blockType = String(form.get("blockType")) as BlockType;
      const content = String(form.get("blockContent"));
      const pageId = String(form.get("pageId"));
      await BlockService.createBlock({
        type: blockType,
        content,
        parent_id: pageId,
      });
      break;
    }
    case "update": {
      const blockId = String(form.get("blockId"));
      const content = String(form.get("blockContent"));
      await BlockService.updateBlock(blockId, { content });
      break;
    }
    case "delete": {
      const blockId = String(form.get("blockId"));
      await BlockService.deleteBlock(blockId);
      break;
    }
    case "deleteAll": {
      await BlockService.deleteAllBlocks();
      break;
    }
    default:
      throw new Error(`Unsupported intent: ${intent}`);
  }

  return null;
}

export default function Index() {
  const { todayPage, recentPages } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  // console.log("Today Page Content:", todayPage.content);

  const handleContentChange = useCallback(
    (content: string) => {
      if (!todayPage || !todayPage.id) {
        console.error("Today's page or its ID is not available");
        return;
      }

      const localDate = new Date();
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000,
      );

      fetcher.submit(
        {
          intent: "updatePage",
          pageId: todayPage.id,
          content,
          date: utcDate.toISOString(),
        },
        { method: "post" },
      );
    },
    [fetcher, todayPage],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
      }}
    >
      <Page
        title={todayPage.title}
        content={todayPage.content}
        onContentChange={handleContentChange}
      />
      {/* {recentPages.map((page) => (
        <Page
          key={page.id}
          title={page.title}
          content={page.content}
          onContentChange={(content: string) =>
            handleContentChange(page.id, content)
          }
        />
      ))} */}
    </Box>
  );
}
