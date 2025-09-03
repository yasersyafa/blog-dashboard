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
