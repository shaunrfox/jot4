import { Block, BlockType } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createBlock({
  type,
  content,
  parent_id,
}: Pick<Block, "type" | "parent_id"> & { content: string }) {
  return prisma.block.create({
    data: {
      type,
      content: JSON.parse(content),
      parent_id,
      attrs: {}, // Add the required 'attrs' property
    },
  });
}

export async function updateBlock(
  id: string,
  { content }: { content: string },
) {
  return prisma.block.update({
    where: { id },
    data: { content: JSON.parse(content) },
  });
}

export async function deleteBlock(id: string) {
  return prisma.block.delete({
    where: { id },
  });
}

export async function getBlockCount() {
  return prisma.block.count();
}

export async function deleteAllBlocks() {
  return prisma.block.deleteMany();
}
