import { BlockType } from '@prisma/client';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useFetcher, useLoaderData } from '@remix-run/react';
import {
    createBlock,
    deleteAllBlocks,
    getAllBlocks
} from '~/models/block.server';

export const meta: MetaFunction = () => {
    return [
        { title: 'Jot App' },
        { name: 'description', content: 'Welcome to Jot!' }
    ];
};

export async function loader() {
    return json({
        blocks: await getAllBlocks()
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const intent = String(form.get('intent'));
    const blockType = String(form.get('blockType')) as BlockType;

    if (intent === 'create') {
        await createBlock({
            type: blockType,
            content: { test: 1234 },
            order: 1
        });
    }

    if (intent === 'deleteAll') {
        // DEMONSTRATION PURPOSES ONLY
        await deleteAllBlocks();
    }

    return null;
}

export default function Index() {
    const { blocks } = useLoaderData<typeof loader>();
    const blockFetcher = useFetcher();

    return (
        <>
            <h1>Home</h1>
            <h3>Blocks</h3>
            <blockFetcher.Form method="POST">
                <label>
                    <input type="radio" name="blockType" value="TEXT" />
                    TEXT
                </label>
                <label>
                    <input type="radio" name="blockType" value="CODE" />
                    CODE
                </label>
                <label>
                    <input type="radio" name="blockType" value="EVENT" />
                    EVENT
                </label>
                <button name="intent" value="create">
                    Add block
                </button>
                {/* DEMONSTRATION PURPOSES ONLY */}
                <button name="intent" value="deleteAll">
                    Delete all blocks
                </button>
            </blockFetcher.Form>
            <ul>
                {blocks.map((block) => (
                    <li key={block.id}>
                        <pre>
                            <code>{JSON.stringify(block)}</code>
                        </pre>
                    </li>
                ))}
            </ul>
        </>
    );
}
