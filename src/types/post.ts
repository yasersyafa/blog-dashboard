export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  tags: Tag[];
}

export interface GetPostsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  month?: number;
  year?: number;
  categoryId?: number;
  tagId?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt: string;
  categoryId: number;
  tags: number[];
}

export interface CreatePostResponse {
  data: Post;
}

export interface GetPostsResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetPostResponse {
  data: Post;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  categoryId?: number;
  tags?: number[];
}

export interface UpdatePostResponse {
  data: Post;
}

export interface DeletePostResponse {
  message: string;
}

// Import the related types
import type { Category } from "./category";
import type { Tag } from "./tag";
