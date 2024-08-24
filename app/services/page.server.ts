import { Page } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createPage({
  title,
  content,
  date,
}: Pick<Page, "title"> & { content: string; date: Date }) {
  return prisma.page.create({
    data: {
      title,
      content: JSON.parse(content),
      date,
    },
  });
}

export async function updatePage(
  id: string,
  {
    title,
    content,
    date,
  }: Partial<Pick<Page, "title" | "date">> & { content?: string },
) {
  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) {
    try {
      updateData.content = JSON.parse(content);
    } catch (error) {
      console.error("Error parsing content:", error);
      updateData.content = {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: content }] },
        ],
      };
    }
  }

  return prisma.page.update({
    where: { id },
    data: updateData,
  });
}

export async function deletePage(id: string) {
  return prisma.page.delete({
    where: { id },
  });
}

export async function getPageById(id: string) {
  return prisma.page.findUnique({
    where: { id },
  });
}

export async function getAllPages() {
  return prisma.page.findMany();
}

export async function getPageCount() {
  return prisma.page.count();
}

export async function deleteAllPages() {
  return prisma.page.deleteMany();
}

export async function getPageByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

  return prisma.page.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });
}

export async function getRecentPages(days: number) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return prisma.page.findMany({
    where: {
      created_at: {
        gte: startDate,
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}
