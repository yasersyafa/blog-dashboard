import axiosInstance from "@/lib/axios";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateCategoryResponse,
  GetCategoriesResponse,
  GetCategoryResponse,
  DeleteCategoryResponse,
} from "@/types/category";

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await axiosInstance.get<GetCategoriesResponse>(
      "/categories"
    );
    return response.data.data;
  },

  // Get category by ID
  getById: async (id: number): Promise<Category> => {
    const response = await axiosInstance.get<GetCategoryResponse>(
      `/categories/${id}`
    );
    return response.data.data;
  },

  // Create new category
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await axiosInstance.post<CreateCategoryResponse>(
      "/categories",
      data
    );
    return response.data.data;
  },

  // Update category
  update: async (
    id: number,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    const response = await axiosInstance.put<GetCategoryResponse>(
      `/categories/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete category
  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<DeleteCategoryResponse>(
      `/categories/${id}`
    );
    return response.data.message;
  },
};
