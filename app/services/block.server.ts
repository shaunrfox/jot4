import { Block, BlockType } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createBlock({
  content,
  type,
  parent_id,
}: Pick<Block, "type" | "parent_id"> & { content: string }) {
  return prisma.block.create({
    data: {
      content: JSON.parse(content),
      type,
      parent_id,
      attrs: {},
      referenced_in: [],
    },
  });
}

export async function updateBlock(
  id: string,
  {
    content,
    type,
    parent_id,
  }: Partial<Pick<Block, "type" | "parent_id">> & {
    content?: string;
  },
) {
  const updateData: any = {};
  if (content !== undefined) updateData.content = JSON.parse(content);
  if (type !== undefined) updateData.type = type;
  if (parent_id !== undefined) updateData.parent_id = parent_id;

  return prisma.block.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteBlock(id: string) {
  return prisma.block.delete({
    where: { id },
  });
}

export async function getBlockById(id: string) {
  return prisma.block.findUnique({
    where: { id },
  });
}

export async function getAllBlocks() {
  return prisma.block.findMany();
}

export async function getBlocksByPageId(pageId: string) {
  return prisma.block.findMany({
    where: { page: { id: pageId } },
  });
}

export async function getBlockCount() {
  return prisma.block.count();
}

export async function deleteAllBlocks() {
  return prisma.block.deleteMany();
}
