import axiosInstance from "@/lib/axios";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
  GetPostResponse,
  UpdatePostResponse,
  DeletePostResponse,
} from "@/types/post";

export const postsApi = {
  // Get all posts
  getAll: async (): Promise<Post[]> => {
    const response = await axiosInstance.get<GetPostsResponse>("/posts");
    return response.data.data;
  },

  // Get post by ID
  getById: async (id: string): Promise<Post> => {
    const response = await axiosInstance.get<GetPostResponse>(`/posts/${id}`);
    return response.data.data;
  },

  // Create new post
  create: async (data: CreatePostRequest): Promise<Post> => {
    const response = await axiosInstance.post<CreatePostResponse>(
      "/posts",
      data
    );
    return response.data.data;
  },

  // Update post
  update: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await axiosInstance.put<UpdatePostResponse>(
      `/posts/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete post
  delete: async (id: string): Promise<string> => {
    const response = await axiosInstance.delete<DeletePostResponse>(
      `/posts/${id}`
    );
    return response.data.message;
  },
};
