import { useParams, useLoaderData, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import Page from "~/components/Page";
import * as PageService from "~/services/page.server";

interface PageData {
  id: string;
  type: string;
  title: string;
  content: string | Record<string, any>;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const page = await PageService.getPageById(id);
    if (!page) {
      throw new Response("Not Found", { status: 404 });
    }
    return json<PageData>(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const formData = await request.formData();
  const content = formData.get("content");

  if (typeof content !== "string") {
    return json({ error: "Invalid content" }, { status: 400 });
  }

  try {
    const updatedPage = await PageService.updatePage(id, { content });
    return json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return json({ error: "Failed to update page" }, { status: 500 });
  }
};

export default function SinglePage() {
  const { id } = useParams();
  const pageData = useLoaderData<PageData>();
  const fetcher = useFetcher();

  const handleContentChange = (content: string) => {
    const formData = new FormData();
    formData.append("content", content);
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Page
      id={id}
      title={pageData.title}
      content={pageData.content}
      date={pageData.date}
      type={pageData.type}
      onContentChange={handleContentChange}
      sx={{ pb: "50vh" }}
    />
  );
}
