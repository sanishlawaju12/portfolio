"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { BlogSchema } from "@/schema/blog";
import { createBlog, updateBlog } from "@/actions/blog/blog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface BlogProps {
  blog?: z.infer<typeof BlogSchema>;
  blogSlug?: string;
  buttonText?: string;
  borderStyle?: string;
  onSuccess?: () => void;
}

export default function BlogForm({
  blog: values,
  blogSlug,
  buttonText = "Add Blog",
  borderStyle = "text-primary hover:bg-primary-500 border-none",
  onSuccess,
}: BlogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: values ?? {
      scheduled_for: "",
      title: "",
      image: { file: undefined as unknown as File },
      excerpt: "",
      body: "",
      deadline: "",
      category: {
        name: "",
      },
      tags: {
        name: "",
      },
      status: "Draft",
    },
  });

  const { formState, reset } = form;

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  async function onSubmit(data: z.infer<typeof BlogSchema>) {
    try {
      let result;

      if (blogSlug) {
        // Editing existing blog (PATCH)
        result = await updateBlog(data, blogSlug);
      } else {
        // Creating new blog (POST)
        result = await createBlog(data);
      }

      if (result.error) {
        const errorObj = result.error as Record<string, string>;
        Object.keys(errorObj).forEach((field) => {
          form.setError(field as any, {
            type: "backend",
            message: errorObj[field],
          });
        });
        toast.error("There were validation errors.");
      } else {
        toast.success(
          blogSlug ? "Blog updated successfully!" : "Blog created successfully!"
        );
        setIsOpen(false);
        onSuccess?.();
      }
    } catch (error) {
      toast.error("Something went wrong while saving the blog.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {blogSlug ? (
          <Button
            variant="ghost"
            className={`text-black p-3 h-8 ${borderStyle} rounded-lg`}
          >
            Edit / Update
          </Button>
        ) : (
          <Button
            variant="outline"
            className={`hover:text-primary text-sm p-3 h-8 ${borderStyle} rounded-lg hover:bg-gray-50`}
          >
            <span className="flex items-center gap-1">
              <Icons.circlePlus size={8} />
              {buttonText}
            </span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] pb-0 px-8">
        <DialogHeader>
          <DialogTitle className="font-medium text-[14.07px]">Blog</DialogTitle>
          <DialogDescription className="text-xl text-gray-600 font-medium">
            Let&apos;s start creating a blog
          </DialogDescription>
        </DialogHeader>

        <div className="h-full max-h-[100vh] overflow-y-auto no-scrollbar p-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="scheduled_for"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Scheduled For <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Excerpt <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a short excerpt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image.file"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Image <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deadline <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Denied">Denied</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category Name <span className="text-red-700">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-1 py-4 justify-end sticky bottom-0 bg-white">
                <Button
                  variant="outline"
                  type="button"
                  className="text-primary border-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="flex items-center justify-center w-auto min-w-20 h-10 px-4"
                >
                  {formState.isSubmitting ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>{buttonText} Blog</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
