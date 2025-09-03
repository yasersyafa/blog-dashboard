import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { useTags } from "@/hooks/useTags";
import { useDeletePost } from "@/hooks/usePosts";
import type { GetPostsQueryParams } from "@/types/post";
import { toast } from "sonner";

function PostCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-white/50 dark:border-gray-800/50">
      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="flex items-center justify-between p-6 pl-8">
        <div className="space-y-3 flex-1">
          <div className="flex items-start justify-between">
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-20 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-18 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-6 ml-6">
          <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-6 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
        <FileText className="h-12 w-12 text-blue-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        No Stories Yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        Start your creative journey by writing your first blog post. Share your
        thoughts, ideas, and expertise with the world.
      </p>
      <Button
        size="lg"
        className="gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => navigate("/dashboard/posts/create")}
      >
        <Plus className="h-5 w-5" />
        Create Your First Story
      </Button>
    </div>
  );
}

export default function PostsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [selectedTag, setSelectedTag] = useState<number | undefined>(undefined);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("all");
  const postsPerPage = 6;

  // Fetch categories and tags for filters
  const { data: categories = [] } = useCategories();
  const { data: tags = [] } = useTags();

  // Build query parameters
  const queryParams: GetPostsQueryParams = {
    page: currentPage,
    limit: postsPerPage,
    ...(searchQuery && { search: searchQuery }),
    ...(selectedCategory && { categoryId: selectedCategory }),
    ...(selectedTag && { tagId: selectedTag }),
  };
  // Fetch posts with query parameters
  const { data: postsResponse, isLoading, error } = usePosts(queryParams);
  const deletePostMutation = useDeletePost();

  // Apply time range filtering on the client side
  const getFilteredPosts = () => {
    if (!postsResponse?.data) return [];

    let filteredPosts = postsResponse.data;

    if (selectedTimeRange !== "all") {
      const now = new Date();
      const timeRanges = {
        "1week": 7,
        "1month": 30,
        "6months": 180,
        "1year": 365,
        "5years": 1825,
      };

      const daysLimit =
        timeRanges[selectedTimeRange as keyof typeof timeRanges];
      if (daysLimit) {
        filteredPosts = filteredPosts.filter((post) => {
          const postDate = new Date(post.createdAt);
          const timeDiff = now.getTime() - postDate.getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return daysDiff <= daysLimit;
        });
      }
    }

    return filteredPosts;
  };

  const filteredPosts = getFilteredPosts();

  const posts = postsResponse?.data || [];

  // Calculate pagination for filtered posts
  const totalFilteredPosts = filteredPosts.length;
  const totalFilteredPages = Math.ceil(totalFilteredPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, selectedTimeRange]);

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      toast.success("Post deleted successfully");
    } catch (error: unknown) {
      console.error("failed to delete posts", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadTimeText = (readTime: number) => {
    return `${readTime} min read`;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Error loading posts
          </h3>
          <p className="text-gray-500">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 p-8 border border-blue-100 dark:border-blue-800/30">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-indigo-200/10 to-sky-200/10 rounded-full blur-xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Content Studio
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Craft stories that inspire and engage
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            onClick={() => navigate("/dashboard/posts/create")}
          >
            <Plus className="h-5 w-5" />
            Create Story
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-r from-white/80 via-blue-50/50 to-indigo-50/50 dark:from-gray-950/80 dark:via-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-blue-500/10">
                <Search className="size-4 text-blue-600" />
              </div>
              <Input
                placeholder="Search your stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/60 dark:bg-gray-900/60 border-blue-200/50 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedCategory?.toString() || "all"}
                onValueChange={(value) =>
                  setSelectedCategory(
                    value === "all" ? undefined : parseInt(value)
                  )
                }
              >
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white/60 dark:bg-gray-900/60 border-indigo-200/50 hover:border-indigo-300 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-indigo-600" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                  <SelectItem value="all" className="rounded-lg">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="rounded-lg"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTag?.toString() || "all"}
                onValueChange={(value) =>
                  setSelectedTag(value === "all" ? undefined : parseInt(value))
                }
              >
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white/60 dark:bg-gray-900/60 border-purple-200/50 hover:border-purple-300 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-purple-600" />
                    <SelectValue placeholder="Filter by tag" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                  <SelectItem value="all" className="rounded-lg">
                    All Tags
                  </SelectItem>
                  {tags.map((tag) => (
                    <SelectItem
                      key={tag.id}
                      value={tag.id.toString()}
                      className="rounded-lg"
                    >
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white/60 dark:bg-gray-900/60 border-green-200/50 hover:border-green-300 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <SelectValue placeholder="Filter by time" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                  <SelectItem value="all" className="rounded-lg">
                    All Times
                  </SelectItem>
                  <SelectItem value="1week" className="rounded-lg">
                    1 Week
                  </SelectItem>
                  <SelectItem value="1month" className="rounded-lg">
                    1 Month
                  </SelectItem>
                  <SelectItem value="6months" className="rounded-lg">
                    6 Months
                  </SelectItem>
                  <SelectItem value="1year" className="rounded-lg">
                    1 Year
                  </SelectItem>
                  <SelectItem value="5years" className="rounded-lg">
                    5 Years
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-sky-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-sky-950/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/10 to-sky-200/10 rounded-full blur-2xl"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-200/50">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {isLoading
                    ? "Loading Stories..."
                    : `Your Stories (${totalFilteredPosts})`}
                </CardTitle>
                <CardDescription>
                  Manage and track your creative content
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {isLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: postsPerPage }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid gap-4">
                {currentPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-white/50 dark:border-gray-800/50 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div
                      className={`absolute left-0 top-0 w-1 h-full ${
                        index % 4 === 0
                          ? "bg-gradient-to-b from-blue-400 to-blue-600"
                          : index % 4 === 1
                          ? "bg-gradient-to-b from-indigo-400 to-indigo-600"
                          : index % 4 === 2
                          ? "bg-gradient-to-b from-purple-400 to-purple-600"
                          : "bg-gradient-to-b from-sky-400 to-sky-600"
                      }`}
                    ></div>

                    <div className="flex items-center justify-between p-6 pl-8">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-lg text-balance pr-4 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
                            >
                              <DropdownMenuItem
                                className="gap-2 rounded-lg"
                                onClick={() =>
                                  navigate(`/dashboard/posts/${post.id}`)
                                }
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 rounded-lg"
                                onClick={() =>
                                  navigate(`/dashboard/posts/${post.id}/edit`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive rounded-lg"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Badge
                            variant="secondary"
                            className={`text-xs px-3 py-1 rounded-full ${
                              index % 4 === 0
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : index % 4 === 1
                                ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                                : index % 4 === 2
                                ? "bg-purple-100 text-purple-700 border-purple-200"
                                : "bg-sky-100 text-sky-700 border-sky-200"
                            }`}
                          >
                            {post.category?.name || "Uncategorized"}
                          </Badge>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{getReadTimeText(post.readTime)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>

                        {post.excerpt && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalFilteredPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-blue-100 dark:border-blue-800/30">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, totalFilteredPosts)} of{" "}
                    {totalFilteredPosts} stories
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="gap-2 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border-blue-200/50 hover:border-blue-300 rounded-xl disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: totalFilteredPages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                              : "bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border-blue-200/50 hover:border-blue-300"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalFilteredPages}
                      className="gap-2 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border-blue-200/50 hover:border-blue-300 rounded-xl disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
