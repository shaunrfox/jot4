import React from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import * as BlockService from "~/services/block.server";
import * as PageService from "~/services/page.server";
import { BlockType } from "@prisma/client";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Rule from "~/components/Rule";
import PageTitleArea from "~/components/PageTitleArea";
import { generateJSON } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";

// Tiptap extensions
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import TiptapHeading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";

// Custom extensions
import { Quote } from "~/extensions/BlockquoteFigure/Quote";
import { QuoteCaption } from "~/extensions/BlockquoteFigure/QuoteCaption";
import { BlockquoteFigure } from "~/extensions/BlockquoteFigure";

export const loader = async () => {
  const pages = await PageService.getAllPages();
  const pagesWithBlocks = await Promise.all(
    pages.map(async (page) => ({
      ...page,
      blocks: await BlockService.getBlocksByPageId(page.id),
    })),
  );
  return json({ pages: pagesWithBlocks });
};

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent"));

  if (intent === "createPage") {
    const title = String(form.get("title"));
    const content = String(form.get("content"));
    await PageService.createPage({ title, content });
  }

  if (intent === "createBlock") {
    const blockType = String(form.get("blockType")) as BlockType;
    const content = String(form.get("blockContent"));
    const pageId = String(form.get("pageId"));

    await BlockService.createBlock({
      type: blockType,
      content,
      parent_id: pageId,
    });
  }

  if (intent === "deletePage") {
    const pageId = String(form.get("pageId"));
    await PageService.deletePage(pageId);
  }

  if (intent === "deleteBlock") {
    const blockId = String(form.get("blockId"));
    await BlockService.deleteBlock(blockId);
  }

  return null;
}

export default function DocumentsRoute() {
  const { pages } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const handleDeletePage = (pageId: string) => {
    fetcher.submit({ intent: "deletePage", pageId }, { method: "POST" });
  };

  const handleDeleteBlock = (blockId: string) => {
    fetcher.submit({ intent: "deleteBlock", blockId }, { method: "POST" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: "100%",
        gap: 4,
        maxWidth: "650px",
        "&:last-child": {
          marginBottom: 8,
        },
      }}
    >
      <Heading level={6}>Pages</Heading>
      {pages.map((page, index) => (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "100%",
              marginBottom: 8,
            }}
          >
            <PageTitleArea
              id={page.id}
              title={page.title}
              date={page.date}
              type={page.type}
            />
            <PageContent content={page.content as JSONContent} />
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

function PageContent({ content }: { content: JSONContent }) {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    const extensions = [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Code,
      CodeBlock,
      TiptapHeading,
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
      HorizontalRule,
      Link,
      Image,
      Dropcursor,
      GapCursor,
      History,
      Quote,
      QuoteCaption,
      BlockquoteFigure,
    ];

    import("@tiptap/core").then(({ generateHTML }) => {
      const generatedHtml = generateHTML(content, extensions);
      setHtml(generatedHtml);
    });
  }, [content]);

  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
}
