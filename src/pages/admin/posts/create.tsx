import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Eye,
  Tag as TagIcon,
  FileText,
  Sparkles,
  X,
} from "lucide-react";
import Editor from "@/components/tiptap/editor";
import { useCategories } from "@/hooks/useCategories";
import { useTags } from "@/hooks/useTags";
import { useCreatePost } from "@/hooks/usePosts";
import { createPostSchema } from "@/lib/validations/post";
import type { CreatePostFormData } from "@/lib/validations/post";

export default function CreatePostPage() {
  const navigate = useNavigate();

  // Fetch categories and tags
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: tags = [], isLoading: tagsLoading } = useTags();
  const createPostMutation = useCreatePost();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      categoryId: 0,
      tags: [],
    },
  });

  const watchedTags = watch("tags");

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      // Update content with editor content
      await createPostMutation.mutateAsync(data);
      // Redirect to posts list on success
      navigate("/dashboard/posts");
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Failed to create post:", error);
    }
  };

  const addTag = (tagId: number) => {
    const currentTags = watch("tags");
    if (!currentTags.includes(tagId) && currentTags.length < 5) {
      setValue("tags", [...currentTags, tagId]);
    }
  };

  const removeTag = (tagIdToRemove: number) => {
    const currentTags = watch("tags");
    setValue(
      "tags",
      currentTags.filter((tagId) => tagId !== tagIdToRemove)
    );
  };

  const getTagName = (tagId: number) => {
    return tags.find((tag) => tag.id === tagId)?.name || "";
  };

  const availableTags = tags.filter((tag) => !watchedTags.includes(tag.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <div className="relative z-10 p-6 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/dashboard/posts")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                Create New Story
              </h1>
            </div>
            <p className="text-slate-600">
              Share your thoughts and ideas with the world
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Post Title
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a compelling title that captures your story's essence
                  </p>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter your post title..."
                    {...register("title")}
                    className="text-lg font-medium border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Content
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Write your full story content using the rich text editor
                  </p>
                </CardHeader>
                <CardContent>
                  <Editor
                    onChangeContent={(content) => {
                      setValue("content", content);
                    }}
                  />
                  <div className="mt-2 text-sm text-slate-500">
                    {watch("content")?.length || 0} characters
                  </div>
                  {errors.content && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.content.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Eye className="w-5 h-5 text-blue-500" />
                    Excerpt
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    A brief summary that appears in previews and search results
                  </p>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write a brief excerpt or summary..."
                    {...register("excerpt")}
                    className="min-h-[100px] border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                    maxLength={200}
                  />
                  <div className="mt-2 text-sm text-slate-500">
                    {watch("excerpt")?.length || 0}/200 characters
                  </div>
                  {errors.excerpt && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.excerpt.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Category
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Choose the main category that best fits your content
                  </p>
                </CardHeader>
                <CardContent>
                  <Select
                    value={
                      watch("categoryId")?.toString() || "No Category Selected"
                    }
                    onValueChange={(value) =>
                      setValue("categoryId", parseInt(value))
                    }
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.categoryId.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <TagIcon className="w-5 h-5 text-blue-500" />
                    Tags
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Add up to 5 tags to help readers discover your story
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Tags */}
                  {watchedTags && watchedTags.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {watchedTags.map((tagId) => (
                          <span
                            key={tagId}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full cursor-pointer transition-colors group"
                            onClick={() => removeTag(tagId)}
                          >
                            {getTagName(tagId)}
                            <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-slate-500">
                    {watchedTags?.length || 0}/5 tags • Click to remove
                  </div>

                  {/* Available Tags */}
                  <div className="space-y-3">
                    <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium text-slate-700">
                        Suggested tags
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.slice(0, 12).map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => addTag(tag.id)}
                            className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-white border border-slate-300 hover:border-slate-400 rounded-full transition-all duration-200"
                            disabled={
                              (watchedTags?.length || 0) >= 5 || tagsLoading
                            }
                          >
                            {tag.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.tags && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.tags.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      createPostMutation.isPending ||
                      !watch("title") ||
                      !watch("content") ||
                      !watch("excerpt") ||
                      !watch("categoryId") ||
                      (watchedTags?.length || 0) === 0
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg"
                  >
                    {isSubmitting || createPostMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Post
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
