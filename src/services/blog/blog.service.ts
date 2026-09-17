
import { apiClient } from "@/services/api/apiClient";

import type { Blog } from "@/types/blog/blog.types";

type FetchHomePageBlogsResponse = {
  data: Blog[];
};

export async function getHomePageBlogs():
  Promise<FetchHomePageBlogsResponse> {
  const response =
    await apiClient.post<FetchHomePageBlogsResponse>(
      "blogs/fetchBlogs",
      {
        flag: "getBlogsForHomePage",
      },
      {
        encrypt: true,
        decrypt: true,
        withCredentials: true,
      }
    );
  // console.log("Homepage blog response:", response.data);
  return response.data;
}
