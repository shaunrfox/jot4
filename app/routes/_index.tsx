import React, { useEffect, useRef, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
// import { TiptapCollabProvider } from "@hocuspocus/provider";
import Box from "~/components/Box";
import Page from "~/components/Page";
import * as PageService from "~/services/page.server";
import * as BlockService from "~/services/block.server";
import { BlockType } from "@prisma/client";
import Rule from "~/components/Rule";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export async function loader() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // This uses local timezone

  const [todayPage, recentPages] = await Promise.all([
    PageService.getPageByDate(today).then(async (page) => {
      if (!page) {
        return PageService.createPage({
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
          type: "DAILY",
        });
      }
      return page;
    }),
    PageService.getRecentDailyPages(7, today),
  ]);

  // console.log("Loader data:", { todayPage, recentPages });

  return json({ todayPage, recentPages });
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await request.formData();
    const intent = String(form.get("intent"));

    // console.log("Action called with intent:", intent);

    switch (intent) {
      case "updatePage": {
        // console.log("👍🏼 Action (updatePage)");
        const pageId = String(form.get("pageId"));
        const content = String(form.get("content"));
        const dateString = String(form.get("date"));

        if (!pageId || pageId === "null") {
          throw new Error("Invalid page ID");
        }

        const updateData: { content?: string; date?: Date } = {};
        if (content) updateData.content = content;
        if (dateString) updateData.date = new Date(dateString);

        // console.log("👍🏼 Updating page:", { pageId, content, dateString });
        const updatedPage = await PageService.updatePage(pageId, updateData);
        // console.log("👍🏼 Page updated successfully:", updatedPage);
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
  const navigation = useNavigation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigation.state === "idle" && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [navigation.state]);

  const debouncedFetcherSubmit = useMemo(
    () =>
      debounce((data: FormData) => {
        // console.log("Debounced submit:", data);
        fetcher.submit(data, { method: "post" });
      }, 1000),
    [fetcher],
  );

  const handleContentChange = useCallback(
    (pageId: string, content: string) => {
      // console.log("handleContentChange", { pageId, content });

      const localDate = new Date();
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000,
      );

      const formData = new FormData();
      formData.append("intent", "updatePage");
      formData.append("pageId", pageId);
      formData.append("content", content);
      formData.append("date", utcDate.toISOString());

      // console.log(
      //   "Submitting update with fetcher",
      //   Object.fromEntries(formData),
      // );

      // Immediately submit the change
      fetcher.submit(formData, { method: "post" });

      // Debounced submit
      debouncedFetcherSubmit(formData);
    },
    [fetcher, debouncedFetcherSubmit, todayPage],
  );

  // Combine todayPage with recentPages
  const allPages = useMemo(
    () => [todayPage, ...recentPages],
    [todayPage, recentPages],
  );

  return (
    <Box
      ref={contentRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 14,
        width: "100%",
      }}
    >
      {allPages.map((page, index) => (
        <React.Fragment key={page.id}>
          {index > 0 && (
            <Rule
              sx={{
                maxWidth: "650px",
                my: 10,
                borderColor: "mint.30",
                borderBottomWidth: 2,
              }}
            />
          )}
          <Page
            id={page.id}
            title={page.title}
            content={page.content}
            date={new Date(page.date)}
            updatedAt={new Date(page.updated_at)}
            type={page.type}
            onContentChange={(content: string) =>
              handleContentChange(page.id, content)
            }
          />
        </React.Fragment>
      ))}
    </Box>
  );
}
