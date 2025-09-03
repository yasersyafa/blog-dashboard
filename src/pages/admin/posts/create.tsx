"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Tag, FileText, Sparkles, X } from "lucide-react";
import { Link } from "react-router";
import Editor from "@/components/tiptap/editor";

export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [] as string[],
  });

  const categories = [
    "Development",
    "Design",
    "Technology",
    "Business",
    "Marketing",
  ];
  const predefinedTags = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Node.js",
    "Python",
    "Design",
    "UI/UX",
    "Frontend",
    "Backend",
    "Tutorial",
    "Tips",
    "Guide",
    "Review",
    "News",
    "Opinion",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Creating post:", formData);
    setIsLoading(false);

    // In real app, redirect to posts list or show success message
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const availableTags = predefinedTags.filter(
    (tag) => !formData.tags.includes(tag)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-sky-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard/posts">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                Create New Story
              </h1>
            </div>
            <p className="text-slate-600">
              Share your thoughts and ideas with the world
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Post Title
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a compelling title that captures your story's essence
                  </p>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter your post title..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="text-lg font-medium border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Content
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Write your full story content using markdown formatting
                  </p>
                </CardHeader>
                <CardContent>
                  {/* <Textarea
                    placeholder="Write your story here..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="min-h-[300px] border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                    required
                  /> */}
                  <Editor />
                  <div className="mt-2 text-sm text-slate-500">
                    {formData.content.length} characters
                  </div>
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Eye className="w-5 h-5 text-blue-500" />
                    Excerpt
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    A brief summary that appears in previews and search results
                  </p>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write a brief excerpt or summary..."
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    className="min-h-[100px] border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                    maxLength={200}
                  />
                  <div className="mt-2 text-sm text-slate-500">
                    {formData.excerpt.length}/200 characters
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Category
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Choose the main category that best fits your content
                  </p>
                </CardHeader>
                <CardContent>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Tag className="w-5 h-5 text-blue-500" />
                    Tags
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Add up to 5 tags to help readers discover your story
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Tags - Medium style without boundaries */}
                  {formData.tags.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full cursor-pointer transition-colors group"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-slate-500">
                    {formData.tags.length}/5 tags • Click to remove
                  </div>

                  {/* Add Tags Button */}
                  <div className="space-y-3">
                    {/* Available Tags - Medium style grid */}
                    <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium text-slate-700">
                        Suggested tags
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.slice(0, 12).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-white border border-slate-300 hover:border-slate-400 rounded-full transition-all duration-200"
                            disabled={formData.tags.length >= 5}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.title || !formData.content}
                    className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Post
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
