"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderIcon } from "lucide-react";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import type { Category } from "@/types/category";
import type { UpdateCategoryFormData } from "@/lib/validations/category";

interface EditCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: number, data: UpdateCategoryFormData) => void;
  category: Category | null;
  isLoading?: boolean;
}

export function EditCategoryModal({
  open,
  onOpenChange,
  onSave,
  category,
  isLoading = false,
}: EditCategoryModalProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5 text-primary" />
            Edit Category
          </DialogTitle>
          <DialogDescription>
            Update the category information to better reflect your content
            organization.
          </DialogDescription>
        </DialogHeader>

        <EditCategoryForm
          category={category}
          onSubmit={onSave}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
