"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TagIcon } from "lucide-react";
import { EditTagForm } from "@/components/forms/edit-tag-form";
import type { Tag } from "@/types/tag";
import type { UpdateTagFormData } from "@/lib/validations/tag";

interface EditTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: number, data: UpdateTagFormData) => void;
  tag: Tag | null;
  isLoading?: boolean;
}

export function EditTagModal({
  open,
  onOpenChange,
  onSave,
  tag,
  isLoading = false,
}: EditTagModalProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!tag) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-primary" />
            Edit Tag
          </DialogTitle>
          <DialogDescription>
            Update the tag name to better reflect your content organization.
          </DialogDescription>
        </DialogHeader>

        <EditTagForm
          tag={tag}
          onSubmit={onSave}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
