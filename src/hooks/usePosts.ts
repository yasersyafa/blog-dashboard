import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/api/posts";
import type { UpdatePostRequest, GetPostsQueryParams } from "@/types/post";
import { toast } from "sonner";

// Query keys
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

// Get all posts
export const usePosts = (params?: GetPostsQueryParams) => {
  return useQuery({
    queryKey: [...postKeys.lists(), params],
    queryFn: () => postsApi.getAll(params),
  });
};

// Get post by ID
export const usePost = (id: string) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
  });
};

// Create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.create,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      toast.success(`Post "${newPost.title}" created successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to create post";
      toast.error(message);
    },
  });
};

// Update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      postsApi.update(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(updatedPost.id),
      });
      toast.success(`Post "${updatedPost.title}" updated successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to update post";
      toast.error(message);
    },
  });
};

// Delete post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.delete,
    onSuccess: (message, deletedPostId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.removeQueries({
        queryKey: postKeys.detail(deletedPostId),
      });
      toast.success(message);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to delete post";
      toast.error(message);
    },
  });
};
