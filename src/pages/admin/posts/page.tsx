import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  category: string;
  tags: string[];
  status: string;
  views: string;
  date: string;
  author: string;
  createdAt: Date;
}
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
  User,
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
import { Link } from "react-router";

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
      >
        <Plus className="h-5 w-5" />
        Create Your First Story
      </Button>
    </div>
  );
}

export default function PostsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const postsPerPage = 5;

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const hasData = Math.random() > 0.2;

      if (hasData) {
        setPosts([
          {
            id: 1,
            title: "Getting Started with Next.js 15",
            category: "Development",
            tags: ["Next.js", "React", "JavaScript"],
            status: "Published",
            views: "1.2K",
            date: "Dec 15, 2024",
            author: "John Doe",
            createdAt: new Date("2024-12-15"),
          },
          {
            id: 2,
            title: "The Future of Web Development",
            category: "Technology",
            tags: ["Web Dev", "Trends", "Future"],
            status: "Draft",
            views: "0",
            date: "Dec 14, 2024",
            author: "Jane Smith",
            createdAt: new Date("2024-12-14"),
          },
          {
            id: 3,
            title: "Building Scalable React Applications",
            category: "Development",
            tags: ["React", "Architecture", "Scalability"],
            status: "Published",
            views: "856",
            date: "Dec 12, 2024",
            author: "Mike Johnson",
            createdAt: new Date("2024-12-12"),
          },
          {
            id: 4,
            title: "UI/UX Design Trends for 2025",
            category: "Design",
            tags: ["UI", "UX", "Design", "Trends"],
            status: "Published",
            views: "2.1K",
            date: "Dec 10, 2024",
            author: "Sarah Wilson",
            createdAt: new Date("2024-12-10"),
          },
          {
            id: 5,
            title: "Introduction to TypeScript",
            category: "Development",
            tags: ["TypeScript", "JavaScript", "Programming"],
            status: "Scheduled",
            views: "0",
            date: "Dec 20, 2024",
            author: "Alex Brown",
            createdAt: new Date("2024-12-20"),
          },
          {
            id: 6,
            title: "Advanced CSS Grid Techniques",
            category: "Design",
            tags: ["CSS", "Grid", "Layout"],
            status: "Published",
            views: "743",
            date: "Nov 28, 2024",
            author: "Emma Davis",
            createdAt: new Date("2024-11-28"),
          },
          {
            id: 7,
            title: "Machine Learning Basics",
            category: "Technology",
            tags: ["ML", "AI", "Python"],
            status: "Published",
            views: "1.8K",
            date: "Nov 15, 2024",
            author: "David Chen",
            createdAt: new Date("2024-11-15"),
          },
          {
            id: 8,
            title: "Mobile-First Design Principles",
            category: "Design",
            tags: ["Mobile", "Responsive", "UX"],
            status: "Draft",
            views: "0",
            date: "Oct 22, 2024",
            author: "Lisa Park",
            createdAt: new Date("2024-10-22"),
          },
          {
            id: 9,
            title: "API Security Best Practices",
            category: "Development",
            tags: ["API", "Security", "Backend"],
            status: "Published",
            views: "1.5K",
            date: "Sep 18, 2024",
            author: "Robert Kim",
            createdAt: new Date("2024-09-18"),
          },
          {
            id: 10,
            title: "Cloud Computing Fundamentals",
            category: "Technology",
            tags: ["Cloud", "AWS", "DevOps"],
            status: "Published",
            views: "2.3K",
            date: "Aug 25, 2024",
            author: "Maria Garcia",
            createdAt: new Date("2024-08-25"),
          },
          {
            id: 11,
            title: "Accessibility in Web Design",
            category: "Design",
            tags: ["A11y", "Accessibility", "Web"],
            status: "Published",
            views: "967",
            date: "Jul 12, 2024",
            author: "James Wilson",
            createdAt: new Date("2024-07-12"),
          },
          {
            id: 12,
            title: "Database Optimization Strategies",
            category: "Development",
            tags: ["Database", "Performance", "SQL"],
            status: "Published",
            views: "1.1K",
            date: "Jun 8, 2024",
            author: "Anna Lee",
            createdAt: new Date("2024-06-08"),
          },
        ]);
      }

      setIsLoading(false);
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const categoryMatch =
      selectedCategory === "all" || post.category === selectedCategory;

    let timeMatch = true;
    if (selectedTimeRange !== "all") {
      const now = new Date();
      const postDate = post.createdAt;
      const timeDiff = now.getTime() - postDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      switch (selectedTimeRange) {
        case "week":
          timeMatch = daysDiff <= 7;
          break;
        case "month":
          timeMatch = daysDiff <= 30;
          break;
        case "3months":
          timeMatch = daysDiff <= 90;
          break;
        case "year":
          timeMatch = daysDiff <= 365;
          break;
        case "3years":
          timeMatch = daysDiff <= 1095;
          break;
        case "5years":
          timeMatch = daysDiff <= 1825;
          break;
      }
    }

    return categoryMatch && timeMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTimeRange]);

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
          <Link to={"/dashboard/posts/create"}>
            <Button
              size="lg"
              className="gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            >
              <Plus className="h-5 w-5" />
              Create Story
            </Button>
          </Link>
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
                className="pl-12 bg-white/60 dark:bg-gray-900/60 border-blue-200/50 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
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
                  <SelectItem value="Development" className="rounded-lg">
                    Development
                  </SelectItem>
                  <SelectItem value="Design" className="rounded-lg">
                    Design
                  </SelectItem>
                  <SelectItem value="Technology" className="rounded-lg">
                    Technology
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white/60 dark:bg-gray-900/60 border-purple-200/50 hover:border-purple-300 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <SelectValue placeholder="Filter by time" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                  <SelectItem value="all" className="rounded-lg">
                    All Time
                  </SelectItem>
                  <SelectItem value="week" className="rounded-lg">
                    This Week
                  </SelectItem>
                  <SelectItem value="month" className="rounded-lg">
                    1 Month
                  </SelectItem>
                  <SelectItem value="3months" className="rounded-lg">
                    3 Months
                  </SelectItem>
                  <SelectItem value="year" className="rounded-lg">
                    1 Year
                  </SelectItem>
                  <SelectItem value="3years" className="rounded-lg">
                    3 Years
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
                    : `Your Stories (${filteredPosts.length})`}
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
              {Array.from({ length: 5 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
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
                              <DropdownMenuItem className="gap-2 rounded-lg">
                                <Eye className="h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 rounded-lg">
                                <Edit className="h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive rounded-lg">
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
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Yaser Syafa</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-blue-100 dark:border-blue-800/30">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredPosts.length)} of{" "}
                    {filteredPosts.length} stories
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="gap-2 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border-blue-200/50 hover:border-blue-300 rounded-xl disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
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
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
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
