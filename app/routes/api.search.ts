import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return json({ results: [] });
  }

  try {
    const results = await prisma.page.findRaw({
      filter: {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { "content.content.content.text": { $regex: query, $options: "i" } },
        ],
      },
      options: {
        projection: {
          id: 1,
          title: 1,
          content: 1,
        },
        limit: 50,
        // Start of Selection
        sort: { createdAt: -1 }, // Sort by createdAt in descending order
      },
    });

    if (!results) {
      return json({ results: [] });
    }

    return json({
      results: results.map((result: any) => ({
        id: result._id,
        title: result.title,
        content: result.content,
      })),
    });
  } catch (error) {
    console.error("Search error:", error);
    return json(
      { error: "An error occurred while searching" },
      { status: 500 },
    );
  }
};
