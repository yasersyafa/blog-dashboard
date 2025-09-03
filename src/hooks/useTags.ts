import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tagsApi } from "@/api/tags";
import type { UpdateTagRequest } from "@/types/tag";
import { toast } from "sonner";

// Query keys
export const tagKeys = {
  all: ["tags"] as const,
  lists: () => [...tagKeys.all, "list"] as const,
  list: (filters: string) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, "detail"] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
};

// Get all tags
export const useTags = () => {
  return useQuery({
    queryKey: tagKeys.lists(),
    queryFn: tagsApi.getAll,
  });
};

// Get tag by ID
export const useTag = (id: number) => {
  return useQuery({
    queryKey: tagKeys.detail(id),
    queryFn: () => tagsApi.getById(id),
    enabled: !!id,
  });
};

// Create tag
export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tagsApi.create,
    onSuccess: (newTag) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      toast.success(`Tag "${newTag.name}" created successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to create tag";
      toast.error(message);
    },
  });
};

// Update tag
export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTagRequest }) =>
      tagsApi.update(id, data),
    onSuccess: (updatedTag) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: tagKeys.detail(updatedTag.id),
      });
      toast.success(`Tag "${updatedTag.name}" updated successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to edit tag";
      toast.error(message);
    },
  });
};

// Delete tag
export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tagsApi.delete,
    onSuccess: (message, deletedTagId) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.removeQueries({ queryKey: tagKeys.detail(deletedTagId) });
      toast.success(message);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to delete tag";
      toast.error(message);
    },
  });
};
