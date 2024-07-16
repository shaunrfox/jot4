import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getAllBlocks } from "~/models/block.server";
import AppHeader from "~/components/AppHeader";

export const loader = async () => {
  const blocks = await getAllBlocks();
  return json({ blocks });
};

export default function DocumentsRoute() {
  const { blocks } = useLoaderData<typeof loader>();

  return (
    <>
      {blocks.map((block) => (
        <div key={block.id}>
          <h2>
            {block.id}: {block.type}
          </h2>
          <pre>
            <code>{JSON.stringify(block.content, null, 2)}</code>
          </pre>
        </div>
      ))}
    </>
  );
}
