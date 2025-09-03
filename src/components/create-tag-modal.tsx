import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TagIcon } from "lucide-react";
import { CreateTagForm } from "@/components/forms/create-tag-form";
import type { CreateTagFormData } from "@/lib/validations/tag";

interface CreateTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CreateTagFormData) => void;
  isLoading?: boolean;
}

export function CreateTagModal({
  open,
  onOpenChange,
  onSave,
  isLoading = false,
}: CreateTagModalProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-primary" />
            Create New Tag
          </DialogTitle>
          <DialogDescription>
            Add a new tag to help categorize and organize your content. Tags
            make it easier for readers to find related posts.
          </DialogDescription>
        </DialogHeader>

        <CreateTagForm
          onSubmit={onSave}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
