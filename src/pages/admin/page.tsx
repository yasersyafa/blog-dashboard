import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  FolderOpen,
  Tag,
  TrendingUp,
  Eye,
  Plus,
  BarChart3,
  Sparkles,
  Zap,
  Clock,
  Users,
  Inbox,
} from "lucide-react";

function StatCardSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
          <div className="text-right space-y-2">
            <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function PostCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/50 dark:border-gray-800/50">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-2 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="space-y-2 flex-1">
          <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const hasData = Math.random() > 0.3;

      if (hasData) {
        setStats([
          {
            title: "Total Posts",
            value: "24",
            change: "+12%",
            changeType: "positive" as const,
            icon: FileText,
          },
          {
            title: "Categories",
            value: "8",
            change: "+2",
            changeType: "positive" as const,
            icon: FolderOpen,
          },
          {
            title: "Tags",
            value: "32",
            change: "+8",
            changeType: "positive" as const,
            icon: Tag,
          },
          {
            title: "Total Views",
            value: "12.4K",
            change: "+18%",
            changeType: "positive" as const,
            icon: Eye,
          },
        ]);

        setRecentPosts([
          {
            title: "Getting Started with Next.js 15",
            category: "Development",
            status: "Published",
            views: "1.2K",
            date: "2 hours ago",
          },
          {
            title: "The Future of Web Development",
            category: "Technology",
            status: "Draft",
            views: "0",
            date: "1 day ago",
          },
          {
            title: "Building Scalable React Applications",
            category: "Development",
            status: "Published",
            views: "856",
            date: "3 days ago",
          },
          {
            title: "UI/UX Design Trends for 2025",
            category: "Design",
            status: "Published",
            views: "2.1K",
            date: "5 days ago",
          },
        ]);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-indigo-950/20 p-8 border border-blue-100 dark:border-blue-800/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-sky-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full blur-xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-200/50">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Transform your ideas into engaging stories
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="h-5 w-5" />
            Create Magic
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : stats.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={BarChart3}
              title="No Statistics Available"
              description="Start creating content to see your dashboard statistics"
            />
          </div>
        ) : (
          stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-md ${
                index === 0
                  ? "bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30"
                  : index === 1
                  ? "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30"
                  : index === 2
                  ? "bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/30 dark:to-cyan-950/30"
                  : "bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-2xl ${
                      index === 0
                        ? "bg-blue-500/10 border border-blue-200/50"
                        : index === 1
                        ? "bg-indigo-500/10 border border-indigo-200/50"
                        : index === 2
                        ? "bg-sky-500/10 border border-sky-200/50"
                        : "bg-teal-500/10 border border-teal-200/50"
                    }`}
                  >
                    <stat.icon
                      className={`h-6 w-6 ${
                        index === 0
                          ? "text-blue-600"
                          : index === 1
                          ? "text-indigo-600"
                          : index === 2
                          ? "text-sky-600"
                          : "text-teal-600"
                      }`}
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1 rounded-full ${
                      index === 0
                        ? "bg-blue-500/10"
                        : index === 1
                        ? "bg-indigo-500/10"
                        : index === 2
                        ? "bg-sky-500/10"
                        : "bg-teal-500/10"
                    }`}
                  >
                    <TrendingUp
                      className={`h-3 w-3 ${
                        index === 0
                          ? "text-blue-600"
                          : index === 1
                          ? "text-indigo-600"
                          : index === 2
                          ? "text-sky-600"
                          : "text-teal-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      index === 0
                        ? "text-blue-600"
                        : index === 1
                        ? "text-indigo-600"
                        : index === 2
                        ? "text-sky-600"
                        : "text-teal-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    this month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-0 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-sky-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-sky-950/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-200/50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Stories</CardTitle>
                  <CardDescription>Your latest creative works</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-200 bg-transparent"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </div>
            ) : recentPosts.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No Posts Yet"
                description="Start writing your first blog post to see it appear here"
              />
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/50 dark:border-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-2 h-12 rounded-full ${
                          index === 0
                            ? "bg-gradient-to-b from-blue-400 to-blue-600"
                            : index === 1
                            ? "bg-gradient-to-b from-indigo-400 to-indigo-600"
                            : index === 2
                            ? "bg-gradient-to-b from-sky-400 to-sky-600"
                            : "bg-gradient-to-b from-teal-400 to-teal-600"
                        }`}
                      ></div>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-semibold text-balance group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30">
                        <Eye className="h-3 w-3 text-blue-600" />
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {post.views}
                        </span>
                      </div>
                      <Badge
                        variant={
                          post.status === "Published" ? "default" : "secondary"
                        }
                        className={
                          post.status === "Published"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : ""
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-200/50">
                  <Zap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Power up your workflow</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="h-4 w-4" />
                Create New Story
              </Button>
              <Button
                className="w-full justify-start gap-3 h-12 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border border-indigo-200/50 hover:border-indigo-300 transition-all duration-300"
                variant="outline"
              >
                <FolderOpen className="h-4 w-4 text-indigo-600" />
                Organize Categories
              </Button>
              <Button
                className="w-full justify-start gap-3 h-12 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border border-purple-200/50 hover:border-purple-300 transition-all duration-300"
                variant="outline"
              >
                <Tag className="h-4 w-4 text-purple-600" />
                Manage Tags
              </Button>
              <Button
                className="w-full justify-start gap-3 h-12 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 border border-pink-200/50 hover:border-pink-300 transition-all duration-300"
                variant="outline"
              >
                <BarChart3 className="h-4 w-4 text-pink-600" />
                Analytics Hub
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950/30 dark:via-cyan-950/30 dark:to-blue-950/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-200/50">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <CardTitle>Audience Insights</CardTitle>
                  <CardDescription>Your readers this week</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Readers
                  </span>
                  <span className="font-bold text-2xl text-teal-600">2.4K</span>
                </div>
                <div className="w-full bg-teal-100 dark:bg-teal-950/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Goal: 3.2K</span>
                  <span>75% complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
