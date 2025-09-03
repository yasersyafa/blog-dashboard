"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateCategorySchema,
  type UpdateCategoryFormData,
} from "@/lib/validations/category";
import { FolderIcon, Loader2 } from "lucide-react";
import type { Category } from "@/types/category";

interface EditCategoryFormProps {
  category: Category;
  onSubmit: (id: number, data: UpdateCategoryFormData) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export function EditCategoryForm({
  category,
  onSubmit,
  isLoading = false,
  onCancel,
}: EditCategoryFormProps) {
  const form = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
    mode: "onChange",
  });

  const handleSubmit = (data: UpdateCategoryFormData) => {
    onSubmit(category.id, data);
    form.reset();
  };

  const handleCancel = () => {
    form.reset({ name: category.name, description: category.description });
    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Category Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Technology, Lifestyle, Business"
                  className="h-10"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                Keep it short and descriptive. Use title case for consistency.
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this category is about and what type of content it will contain..."
                  className="min-h-[100px] resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                Provide a clear description to help readers understand what
                content to expect.
              </p>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <FolderIcon className="mr-2 h-4 w-4" />
                Update Category
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
