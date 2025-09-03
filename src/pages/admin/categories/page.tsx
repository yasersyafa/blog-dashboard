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
  FolderOpen,
  FileText,
  FolderIcon,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CreateCategoryModal } from "@/components/create-category-modal";
import { EditCategoryModal } from "@/components/edit-category-modal";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";
import type {
  Category as CategoryType,
  CreateCategoryFormData,
  UpdateCategoryFormData,
} from "@/types/category";

function CategorySkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted w-9 h-9" />
            <div>
              <div className="h-5 bg-muted rounded w-24 mb-2" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          </div>
          <div className="h-8 w-8 bg-muted rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-muted rounded w-full mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mb-6">
        <FolderIcon className="h-12 w-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No categories created yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
        Categories help organize your content into logical groups. Create your
        first category to start structuring your blog posts.
      </p>
      <Button className="gap-2" onClick={onCreateClick}>
        <Plus className="h-4 w-4" />
        Create Your First Category
      </Button>
    </div>
  );
}

export default function CategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // API hooks
  const { data: categories = [], isLoading, error } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = async (categoryData: CreateCategoryFormData) => {
    try {
      await createCategoryMutation.mutateAsync(categoryData);
      setIsCreateModalOpen(false);
    } catch {
      // Error is handled by the mutation hook
    }
  };

  const handleUpdateCategory = async (
    id: number,
    categoryData: UpdateCategoryFormData
  ) => {
    try {
      await updateCategoryMutation.mutateAsync({ id, data: categoryData });
      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch {
      // Error is handled by the mutation hook
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
      } catch {
        // Error is handled by the mutation hook
      }
    }
  };

  const handleEditClick = (category: CategoryType) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
          <FolderIcon className="h-12 w-12 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Error loading categories
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
          There was an error loading your categories. Please try again later.
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
          <h1 className="text-3xl font-bold text-balance">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Organize your content into logical groups and help readers discover
            related posts
          </p>
        </div>
        <Button className="gap-2" onClick={handleCreateClick}>
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <>
          {/* Categories Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>

          {/* Summary Card Skeleton */}
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-40 mb-2" />
              <div className="h-4 bg-muted rounded w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
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
      ) : filteredCategories.length === 0 ? (
        searchQuery ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No categories found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
              No categories match your search query "{searchQuery}". Try
              adjusting your search terms.
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
          {/* Categories Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {category.postCount} posts
                          </span>
                        </div>
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
                          onClick={() => handleEditClick(category)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={deleteCategoryMutation.isPending}
                        >
                          {deleteCategoryMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-pretty mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created{" "}
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Category Overview</CardTitle>
              <CardDescription>
                Summary of your content organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredCategories.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Categories
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredCategories.reduce(
                      (sum, cat) => sum + cat.postCount,
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Posts
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">
                    {filteredCategories.length > 0
                      ? Math.round(
                          filteredCategories.reduce(
                            (sum, cat) => sum + cat.postCount,
                            0
                          ) / filteredCategories.length
                        )
                      : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg Posts per Category
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreateCategory}
        isLoading={createCategoryMutation.isPending}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleUpdateCategory}
        category={editingCategory}
        isLoading={updateCategoryMutation.isPending}
      />
    </div>
  );
}
