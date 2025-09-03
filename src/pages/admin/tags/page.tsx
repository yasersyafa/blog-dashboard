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
  Edit,
  Trash2,
  MoreHorizontal,
  Tag,
  TrendingUp,
  Hash,
  TagIcon,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CreateTagModal } from "@/components/create-tag-modal";
import { EditTagModal } from "@/components/edit-tag-modal";
import {
  useTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "@/hooks/useTags";
import type {
  Tag as TagType,
  CreateTagFormData,
  UpdateTagFormData,
} from "@/types/tag";

function TagOverviewSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded" />
          <div className="h-6 bg-muted rounded w-32" />
        </div>
        <div className="h-4 bg-muted rounded w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted" />
                <div className="h-6 bg-muted rounded w-16" />
              </div>
              <div className="h-4 bg-muted rounded w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TagGridSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 bg-muted rounded w-32 mb-2" />
        <div className="h-4 bg-muted rounded w-48" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-muted w-6 h-6" />
                <div>
                  <div className="h-6 bg-muted rounded w-16 mb-1" />
                  <div className="h-3 bg-muted rounded w-12" />
                </div>
              </div>
              <div className="h-8 w-8 bg-muted rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mb-6">
        <TagIcon className="h-12 w-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No tags created yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
        Tags help readers find related content quickly. Create your first tag to
        start organizing your posts by topics and themes.
      </p>
      <Button className="gap-2" onClick={onCreateClick}>
        <Plus className="h-4 w-4" />
        Create Your First Tag
      </Button>
    </div>
  );
}

export default function TagsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // API hooks
  const { data: tags = [], isLoading, error } = useTags();
  const createTagMutation = useCreateTag();
  const updateTagMutation = useUpdateTag();
  const deleteTagMutation = useDeleteTag();

  // Filter tags based on search
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get popular and trending tags
  const popularTags = [...filteredTags]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  const trendingTags = [...filteredTags]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 6);

  const handleCreateTag = async (tagData: CreateTagFormData) => {
    try {
      await createTagMutation.mutateAsync(tagData);
      setIsCreateModalOpen(false);
    } catch {
      // Error is handled by the mutation hook
    }
  };

  const handleUpdateTag = async (id: number, tagData: UpdateTagFormData) => {
    try {
      await updateTagMutation.mutateAsync({ id, data: tagData });
      setIsEditModalOpen(false);
      setEditingTag(null);
    } catch {
      // Error is handled by the mutation hook
    }
  };

  const handleDeleteTag = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this tag? This action cannot be undone."
      )
    ) {
      try {
        await deleteTagMutation.mutateAsync(id);
      } catch {
        // Error is handled by the mutation hook
      }
    }
  };

  const handleEditClick = (tag: TagType) => {
    setEditingTag(tag);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
          <TagIcon className="h-12 w-12 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Error loading tags
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
          There was an error loading your tags. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Tags</h1>
          <p className="text-muted-foreground mt-2">
            Manage tags to help organize and categorize your content
          </p>
        </div>
        <Button className="gap-2" onClick={handleCreateClick}>
          <Plus className="h-4 w-4" />
          New Tag
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <>
          {/* Overview Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            <TagOverviewSkeleton />
            <Card className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-muted rounded" />
                  <div className="h-6 bg-muted rounded w-28" />
                </div>
                <div className="h-4 bg-muted rounded w-52" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-6 bg-muted rounded w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Tags Skeleton */}
          <TagGridSkeleton />

          {/* Summary Stats Skeleton */}
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-32 mb-2" />
              <div className="h-4 bg-muted rounded w-48" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-lg bg-muted/50"
                  >
                    <div className="h-8 bg-muted rounded w-12 mx-auto mb-2" />
                    <div className="h-4 bg-muted rounded w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : filteredTags.length === 0 ? (
        searchQuery ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tags found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
              No tags match your search query "{searchQuery}". Try adjusting
              your search terms.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <EmptyState onCreateClick={handleCreateClick} />
        )
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Most Popular Tags
                </CardTitle>
                <CardDescription>Tags with the most posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTags.map((tag, index) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {index + 1}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {tag.name}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {tag.postCount} posts
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  Trending Tags
                </CardTitle>
                <CardDescription>
                  Tags that are currently trending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      className="bg-green-100 text-green-800 relative"
                      variant="secondary"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {tag.name}
                      <span className="ml-1 text-xs">({tag.postCount})</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Tags */}
          <Card>
            <CardHeader>
              <CardTitle>All Tags ({filteredTags.length})</CardTitle>
              <CardDescription>Complete list of all your tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-primary/10">
                        <Tag className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {tag.name}
                          </Badge>
                          {tag.postCount > 5 && (
                            <TrendingUp className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tag.postCount} posts
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => handleEditClick(tag)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive"
                          onClick={() => handleDeleteTag(tag.id)}
                          disabled={deleteTagMutation.isPending}
                        >
                          {deleteTagMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Tag Statistics</CardTitle>
              <CardDescription>Overview of your tag usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredTags.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Tags
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {trendingTags.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Trending Tags
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredTags.reduce((sum, tag) => sum + tag.postCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Tag Usage
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredTags.length > 0
                      ? Math.round(
                          filteredTags.reduce(
                            (sum, tag) => sum + tag.postCount,
                            0
                          ) / filteredTags.length
                        )
                      : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg Uses per Tag
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Create Tag Modal */}
      <CreateTagModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreateTag}
        isLoading={createTagMutation.isPending}
      />

      {/* Edit Tag Modal */}
      <EditTagModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleUpdateTag}
        tag={editingTag}
        isLoading={updateTagMutation.isPending}
      />
    </div>
  );
}
