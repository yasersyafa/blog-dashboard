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
import { updateTagSchema, type UpdateTagFormData } from "@/lib/validations/tag";
import { TagIcon, Loader2 } from "lucide-react";
import type { Tag } from "@/types/tag";

interface EditTagFormProps {
  tag: Tag;
  onSubmit: (id: number, data: UpdateTagFormData) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export function EditTagForm({
  tag,
  onSubmit,
  isLoading = false,
  onCancel,
}: EditTagFormProps) {
  const form = useForm<UpdateTagFormData>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: tag.name,
    },
    mode: "onChange",
  });

  const handleSubmit = (data: UpdateTagFormData) => {
    onSubmit(tag.id, data);
    form.reset();
  };

  const handleCancel = () => {
    form.reset({ name: tag.name });
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
                Tag Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., react, javascript, tutorial"
                  className="h-10"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                Keep it short and descriptive. Use lowercase for consistency.
                Only letters, numbers, spaces, hyphens, and underscores are
                allowed.
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
                <TagIcon className="mr-2 h-4 w-4" />
                Update Tag
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
