import axiosInstance from "@/lib/axios";
import type {
  Tag,
  CreateTagRequest,
  UpdateTagRequest,
  CreateTagResponse,
  GetTagsResponse,
  GetTagResponse,
  DeleteTagResponse,
} from "@/types/tag";

export const tagsApi = {
  // Get all tags
  getAll: async (): Promise<Tag[]> => {
    const response = await axiosInstance.get<GetTagsResponse>("/tags");
    return response.data.data;
  },

  // Get tag by ID
  getById: async (id: number): Promise<Tag> => {
    const response = await axiosInstance.get<GetTagResponse>(`/tags/${id}`);
    return response.data.data;
  },

  // Create new tag
  create: async (data: CreateTagRequest): Promise<Tag> => {
    const response = await axiosInstance.post<CreateTagResponse>("/tags", data);
    return response.data.data;
  },

  // Update tag
  update: async (id: number, data: UpdateTagRequest): Promise<Tag> => {
    const response = await axiosInstance.put<GetTagResponse>(
      `/tags/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete tag
  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<DeleteTagResponse>(
      `/tags/${id}`
    );
    return response.data.message;
  },
};
