import { Block } from '@prisma/client';

import { prisma } from '~/db.server';

export function createBlock({
    content,
    type,
    order
}: Pick<Block, 'type' | 'order'> & { content: object }) {
    return prisma.block.create({
        data: {
            content,
            type,
            order
        }
    });
}

export function getAllBlocks() {
    return prisma.block.findMany();
}

export function deleteAllBlocks() {
    return prisma.block.deleteMany();
}
