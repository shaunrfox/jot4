import { useCallback, useState, useMemo } from "react";
import debounce from "lodash/debounce";
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
  try {
    const form = await request.formData();
    const intent = String(form.get("intent"));

    console.log("Action called with intent:", intent);

    switch (intent) {
      case "updatePage": {
        console.log("👍🏼 Action (updatePage)");
        const pageId = String(form.get("pageId"));
        const content = String(form.get("content"));
        const dateString = String(form.get("date"));

        if (!pageId || pageId === "null") {
          throw new Error("Invalid page ID");
        }

        const updateData: { content?: string; date?: Date } = {};
        if (content) updateData.content = content;
        if (dateString) updateData.date = new Date(dateString);

        console.log("👍🏼 Updating page:", { pageId, content, dateString });
        const updatedPage = await PageService.updatePage(pageId, updateData);
        console.log("👍🏼 Page updated successfully:", updatedPage);
        return json({ success: true, updatedPage });
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
  } catch (error) {
    console.error("Error in action:", error);
    return json({ error: "An error occurred" }, { status: 500 });
  }
}

export default function Index() {
  const { todayPage, recentPages } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  // console.log("Today Page Content:", todayPage.content);

  const debouncedFetcherSubmit = useMemo(
    () =>
      debounce((data: any) => {
        console.log("Debounced submit:", data);
        fetcher.submit(data, { method: "post" });
      }, 1000),
    [fetcher],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      console.log("handleContentChange", { content });
      if (!todayPage || !todayPage.id) {
        console.error("Today's page or its ID is not available");
        return;
      }

      const localDate = new Date();
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000,
      );

      console.log("Submitting update with fetcher", {
        intent: "updatePage",
        pageId: todayPage.id,
        contentLength: content.length,
        date: utcDate.toISOString(),
      });

      // Immediately submit the change
      fetcher.submit(
        {
          intent: "updatePage",
          pageId: todayPage.id,
          content,
          date: utcDate.toISOString(),
        },
        { method: "post" },
      );

      debouncedFetcherSubmit({
        intent: "updatePage",
        pageId: todayPage.id,
        content,
        date: utcDate.toISOString(),
      });
    },
    [fetcher, debouncedFetcherSubmit, todayPage],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        width: "100%",
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
