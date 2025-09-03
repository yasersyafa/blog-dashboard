import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/api/categories";
import type { UpdateCategoryRequest } from "@/types/category";
import { toast } from "sonner";

// Query keys
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
};

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoriesApi.getAll,
  });
};

// Get category by ID
export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};

// Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      toast.success(`Category "${newCategory.name}" created successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to create category";
      toast.error(message);
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryRequest }) =>
      categoriesApi.update(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(updatedCategory.id),
      });
      toast.success(`Category "${updatedCategory.name}" updated successfully`);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to update category";
      toast.error(message);
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.delete,
    onSuccess: (message, deletedCategoryId) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.removeQueries({
        queryKey: categoryKeys.detail(deletedCategoryId),
      });
      toast.success(message);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to delete category";
      toast.error(message);
    },
  });
};
