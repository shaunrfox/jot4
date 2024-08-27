import { Page } from "@prisma/client";
import * as PageService from "~/services/page.server";

export async function createPage({
  title,
  content,
}: Pick<Page, "title"> & { content: string }) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
    console.log("Parsed content:", parsedContent);
  } catch (error) {
    parsedContent = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: content }],
        },
      ],
    };
  }

  return PageService.createPage({
    title,
    content: JSON.stringify(parsedContent),
    date: new Date(),
  });
}

export function updatePage(
  id: string,
  {
    title,
    content,
    date,
  }: Partial<Pick<Page, "title" | "date">> & { content?: string },
) {
  console.log("👍🏼 updatePage triggered", { id, title, content, date });
  return PageService.updatePage(id, { title, content, date });
}

export function deletePage(id: string) {
  return PageService.deletePage(id);
}

export function getPageById(id: string) {
  return PageService.getPageById(id);
}

export function getAllPages() {
  return PageService.getAllPages();
}

export function getPageCount() {
  return PageService.getPageCount();
}

export function deleteAllPages() {
  return PageService.deleteAllPages();
}
