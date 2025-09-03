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
import { createTagSchema, type CreateTagFormData } from "@/lib/validations/tag";
import { TagIcon, Loader2 } from "lucide-react";

interface CreateTagFormProps {
  onSubmit: (data: CreateTagFormData) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export function CreateTagForm({
  onSubmit,
  isLoading = false,
  onCancel,
}: CreateTagFormProps) {
  const form = useForm<CreateTagFormData>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const handleSubmit = (data: CreateTagFormData) => {
    onSubmit(data);
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
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
                Keep it short and descriptive.
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
                Creating...
              </>
            ) : (
              <>
                <TagIcon className="mr-2 h-4 w-4" />
                Create Tag
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
