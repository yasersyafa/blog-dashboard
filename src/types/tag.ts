export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
}

export interface CreateTagRequest {
  name: string;
}

// Re-export the form data types for convenience
export type {
  CreateTagFormData,
  UpdateTagFormData,
} from "@/lib/validations/tag";

export interface UpdateTagRequest {
  name: string;
}

export interface CreateTagResponse {
  data: Tag;
}

export interface GetTagsResponse {
  data: Tag[];
}

export interface GetTagResponse {
  data: Tag;
}

export interface DeleteTagResponse {
  message: string;
}
