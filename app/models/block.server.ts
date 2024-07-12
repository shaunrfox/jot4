import { Block } from '@prisma/client';

import { prisma } from '~/db.server';

// create
// update
// delete
// get by id
// get all
// get count

export function createBlock({
    content,
    type,
    order
}: Pick<Block, 'type' | 'order'> & { content: string }) {
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

export function getBlockCount() {
    return prisma.block.count();
}

export function deleteAllBlocks() {
    return prisma.block.deleteMany();
}
