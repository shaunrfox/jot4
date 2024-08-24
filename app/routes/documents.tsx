import { useLoaderData, useFetcher } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import * as BlockService from "~/services/block.server";
import * as PageService from "~/services/page.server";
import { BlockType } from "@prisma/client";
import Box from "~/components/Box";
import { IconButton } from "~/components/Button";
import Trash from "~/components/icons/Trash";
import Heading from "~/components/Heading";
import Text from "~/components/Text";

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
  const { pages, blocks } = useLoaderData<typeof loader>();
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
      {pages.map((page) => (
        <Box
          key={page.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            border: "1px solid",
            borderColor: "gray.30",
            borderRadius: 4,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderBottom: "1px solid",
              borderColor: "gray.20",
              paddingBottom: 4,
              marginBottom: 4,
            }}
          >
            <Heading level={4}>{page.title}</Heading>
            <IconButton
              variant="hollow"
              onClick={() => handleDeletePage(page.id)}
            >
              <Trash />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 10 }}>
            <details style={{ width: "50%" }}>
              <Text
                as="summary"
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  "&::marker": {
                    content: "none",
                  },
                  "&::after": {
                    display: "block",
                    content: "' '",
                    width: ".45em",
                    height: ".45em",
                    borderBottom: "1px solid",
                    borderRight: "1px solid",
                    borderColor: "gray.50",
                    position: "absolute",
                    top: "calc(50% - 1px)",
                    right: 0,
                    transform: "translateY(-50%) rotate(45deg)",
                    transformOrigin: "50% 50%",
                  },
                }}
              >
                Content
              </Text>
              <pre
                style={{
                  width: "100%",
                  fontSize: "12px",
                  padding: "5px 10px",
                }}
              >
                <Box as="code" sx={{ whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(page.content, null, 2)}
                </Box>
              </pre>
            </details>
            <Box
              as="ul"
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                width: "50%",
              }}
            >
              {page.blocks.map((block) => (
                <Box
                  as="li"
                  key={block.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Box
                    as="details"
                    sx={{
                      width: "100%",
                      summary: {
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                      },
                      "&[open] > summary::after": {
                        transform: "rotate(225deg)",
                      },
                    }}
                  >
                    <Text
                      as="summary"
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        "&::marker": {
                          content: "none",
                        },
                        "&::after": {
                          display: "block",
                          content: "' '",
                          width: ".45em",
                          height: ".45em",
                          borderBottom: "1px solid",
                          borderRight: "1px solid",
                          borderColor: "gray.50",
                          position: "absolute",
                          top: "calc(50% - 1px)",
                          right: 0,
                          transform: "translateY(-50%) rotate(45deg)",
                          transformOrigin: "50% 50%",
                        },
                      }}
                    >
                      {block.type}
                    </Text>
                    <Text level={2} sx={{ color: "gray.30" }}>
                      {block.id}
                    </Text>
                    <pre
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        padding: "10px",
                      }}
                    >
                      <Box
                        as="code"
                        sx={{ width: "100%", whiteSpace: "pre-wrap" }}
                      >
                        {JSON.stringify(block.content, null, 2)}
                      </Box>
                    </pre>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
