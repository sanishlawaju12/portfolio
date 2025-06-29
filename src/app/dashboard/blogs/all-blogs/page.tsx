import BlogListTable from "@/components/blog/blog-list-table"
import { BlogListResponse } from "@/types/blog";
import { fetchApi } from "@/hooks/useApi";

/**
 * This page component renders the list view of the Human Resource Roster.
 * 
 * Props:
 * - `params.slug`: The unique identifier used to fetch roster-specific data.
 * - `searchParams`: Optional query parameters extracted from the URL (e.g., filters, search queries, pagination).
 *   Passed down to the `Talents` component to control the display or behavior dynamically based on URL state.
 */

async function getBlogData(): Promise<BlogListResponse> {

  return fetchApi<BlogListResponse>({
    endpoint: "blogs/",
    method: "GET",
  });
}

async function HumanResourceListPage() {
  const blogDatas  = await getBlogData();
  return <BlogListTable blogs={blogDatas?.results} />
}

export default HumanResourceListPage