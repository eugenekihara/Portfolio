"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X, ImagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProjectFormData {
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  categoryTag: string;
  technologies: string;
  thumbnail: string;
  additionalImages: string;
  githubUrl: string;
  liveDemoUrl: string;
  completionDate: string;
  featured: boolean;
  published: boolean;
  impact: string;
  caseStudyHref: string;
  order: number;
}

interface ProjectFormProps {
  projectId?: string;
}

const CATEGORIES = [
  "UI/UX Design",
  "Web Development",
  "Full Stack",
  "Product Design",
  "Branding",
  "Mobile App",
  "AgriTech",
  "Other",
];

const defaultFormData: ProjectFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  detailedDescription: "",
  category: "",
  categoryTag: "",
  technologies: "",
  thumbnail: "",
  additionalImages: "",
  githubUrl: "",
  liveDemoUrl: "",
  completionDate: "",
  featured: false,
  published: true,
  impact: "",
  caseStudyHref: "",
  order: 0,
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!projectId);
  const [uploading, setUploading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing project data for editing
  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const res = await fetch(`/api/projects/${projectId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              title: data.title || "",
              slug: data.slug || "",
              shortDescription: data.shortDescription || "",
              detailedDescription: data.detailedDescription || "",
              category: data.category || "",
              categoryTag: data.categoryTag || "",
              technologies: data.technologies || "",
              thumbnail: data.thumbnail || "",
              additionalImages: data.additionalImages || "",
              githubUrl: data.githubUrl || "",
              liveDemoUrl: data.liveDemoUrl || "",
              completionDate: data.completionDate
                ? new Date(data.completionDate).toISOString().split("T")[0]
                : "",
              featured: data.featured ?? false,
              published: data.published ?? true,
              impact: data.impact || "",
              caseStudyHref: data.caseStudyHref || "",
              order: data.order ?? 0,
            });
          } else {
            toast({
              title: "Error",
              description: "Project not found",
              variant: "destructive",
            });
            router.push("/admin");
          }
        } catch {
          toast({
            title: "Error",
            description: "Failed to fetch project",
            variant: "destructive",
          });
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
    }
  }, [projectId, router]);

  const handleChange = (
    field: keyof ProjectFormData,
    value: string | boolean | number
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-generate slug from title
      if (field === "title" && !slugManuallyEdited) {
        updated.slug = generateSlug(value as string);
      }

      return updated;
    });
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setFormData((prev) => ({ ...prev, slug: value }));
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, thumbnail: data.path }));
        toast({ title: "Success", description: "Image uploaded" });
      } else {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.error || "Upload failed",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const existingImages = formData.additionalImages
        ? formData.additionalImages.split(",").filter(Boolean)
        : [];
      const newPaths: string[] = [];

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (res.ok) {
          const data = await res.json();
          newPaths.push(data.path);
        }
      }

      const allImages = [...existingImages, ...newPaths];
      setFormData((prev) => ({
        ...prev,
        additionalImages: allImages.join(","),
      }));
      toast({ title: "Success", description: `${newPaths.length} image(s) uploaded` });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const images = formData.additionalImages
      .split(",")
      .filter(Boolean);
    images.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      additionalImages: images.join(","),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.shortDescription || !formData.category || !formData.technologies || !formData.thumbnail) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const url = projectId
        ? `/api/projects/${projectId}`
        : "/api/projects";
      const method = projectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: projectId
            ? "Project updated successfully"
            : "Project created successfully",
        });
        router.push("/admin");
        router.refresh();
      } else {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.error || "Failed to save project",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#8b4049]" />
      </div>
    );
  }

  const additionalImagesList = formData.additionalImages
    .split(",")
    .filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. WAVEEATZ"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g. waveeatz"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">
              Short Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) =>
                handleChange("shortDescription", e.target.value)
              }
              placeholder="Brief description for project card"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailedDescription">Detailed Description</Label>
            <Textarea
              id="detailedDescription"
              value={formData.detailedDescription}
              onChange={(e) =>
                handleChange("detailedDescription", e.target.value)
              }
              placeholder="Full project description for case study page"
              rows={5}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryTag">Category Tag</Label>
              <Input
                id="categoryTag"
                value={formData.categoryTag}
                onChange={(e) => handleChange("categoryTag", e.target.value)}
                placeholder="e.g. Product Design, App Design"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies Used <span className="text-red-500">*</span>
            </Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => handleChange("technologies", e.target.value)}
              placeholder="Comma-separated, e.g. Figma, Prototyping, UX Research"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="impact">Impact Statement</Label>
            <Input
              id="impact"
              value={formData.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              placeholder="e.g. 40% retention increase"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="caseStudyHref">Case Study Link</Label>
            <Input
              id="caseStudyHref"
              value={formData.caseStudyHref}
              onChange={(e) => handleChange("caseStudyHref", e.target.value)}
              placeholder="e.g. https://www.figma.com/design/... or /projects/my-project"
            />
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">
            Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Thumbnail */}
          <div className="space-y-2">
            <Label>
              Project Thumbnail <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-start gap-4">
              {formData.thumbnail ? (
                <div className="relative group">
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail"
                    className="w-40 h-28 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, thumbnail: "" }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null}
              <div>
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => thumbnailInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ImagePlus className="h-4 w-4 mr-2" />
                  )}
                  {formData.thumbnail ? "Replace" : "Upload"} Thumbnail
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Or enter path manually:
            </p>
            <Input
              value={formData.thumbnail}
              onChange={(e) => handleChange("thumbnail", e.target.value)}
              placeholder="/waveeatz.png or /uploads/image.jpg"
            />
          </div>

          {/* Additional Images */}
          <div className="space-y-2">
            <Label>Additional Images</Label>
            {additionalImagesList.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {additionalImagesList.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Additional ${i + 1}`}
                      className="w-24 h-18 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <input
                type="file"
                ref={additionalInputRef}
                onChange={handleAdditionalImagesUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => additionalInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload Additional Images
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links & Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">
            Links & Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveDemoUrl">Live Demo URL</Label>
              <Input
                id="liveDemoUrl"
                value={formData.liveDemoUrl}
                onChange={(e) => handleChange("liveDemoUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) =>
                  handleChange("completionDate", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  handleChange("order", parseInt(e.target.value) || 0)
                }
                min={0}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">
            Visibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </Label>
              <p className="text-xs text-muted-foreground">
                Featured projects appear prominently on the portfolio page
              </p>
            </div>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleChange("featured", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="published" className="text-sm font-medium">
                Published
              </Label>
              <p className="text-xs text-muted-foreground">
                Unpublished projects are hidden from the public portfolio
              </p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleChange("published", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center gap-4 justify-end pb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#8b4049] hover:bg-[#733540] text-white min-w-[140px]"
          disabled={loading || uploading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : projectId ? (
            "Update Project"
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
}
