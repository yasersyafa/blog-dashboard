"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderIcon } from "lucide-react";
import { CreateCategoryForm } from "@/components/forms/create-category-form";
import type { CreateCategoryFormData } from "@/lib/validations/category";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CreateCategoryFormData) => void;
  isLoading?: boolean;
}

export function CreateCategoryModal({
  open,
  onOpenChange,
  onSave,
  isLoading = false,
}: CreateCategoryModalProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5 text-primary" />
            Create New Category
          </DialogTitle>
          <DialogDescription>
            Add a new category to help organize and structure your content.
            Categories provide a high-level organization system for your blog
            posts.
          </DialogDescription>
        </DialogHeader>

        <CreateCategoryForm
          onSubmit={onSave}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
