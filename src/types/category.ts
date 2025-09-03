export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

export interface CreateCategoryResponse {
  data: Category;
}

export interface GetCategoriesResponse {
  data: Category[];
}

export interface GetCategoryResponse {
  data: Category;
}

export interface DeleteCategoryResponse {
  message: string;
}

// Re-export the form data types for convenience
export type {
  CreateCategoryFormData,
  UpdateCategoryFormData,
} from "@/lib/validations/category";
