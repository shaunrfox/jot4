import { Page } from "@prisma/client";
import * as PageService from "~/services/page.server";

export async function createPage({
  title,
  content,
}: Pick<Page, "title"> & { content: string }) {
  let parsedContent;
  try {
    // Check if content is already a JSON string
    parsedContent = JSON.parse(content);
  } catch (error) {
    // If parsing fails, assume it's a plain string and create a default structure
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
    content: JSON.stringify(parsedContent), // Stringify only once
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
