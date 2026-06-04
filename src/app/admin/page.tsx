"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminNav } from "../components/admin-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryTag: string | null;
  thumbnail: string;
  featured: boolean;
  published: boolean;
  order: number;
  impact: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {
      toast({ title: "Error", description: "Failed to fetch projects", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router, fetchProjects]);

  const handleToggleFeatured = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}/toggle-featured`, {
        method: "PATCH",
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
        toast({ title: "Success", description: "Featured status updated" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update featured status", variant: "destructive" });
    }
  };

  const handleTogglePublished = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}/toggle-published`, {
        method: "PATCH",
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
        toast({ title: "Success", description: "Published status updated" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update published status", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteId));
        toast({ title: "Success", description: "Project deleted" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newProjects = [...projects];
    [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];

    const orders = newProjects.map((p, i) => ({ id: p.id, order: i }));

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });
      if (res.ok) {
        setProjects(newProjects);
        toast({ title: "Success", description: "Project order updated" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to reorder projects", variant: "destructive" });
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === projects.length - 1) return;
    const newProjects = [...projects];
    [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];

    const orders = newProjects.map((p, i) => ({ id: p.id, order: i }));

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });
      if (res.ok) {
        setProjects(newProjects);
        toast({ title: "Success", description: "Project order updated" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to reorder projects", variant: "destructive" });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0eb]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8b4049]" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
              Manage Projects
            </h1>
            <p className="text-muted-foreground mt-1">
              Add, edit, and organize your portfolio projects
            </p>
          </div>

          <Button
            onClick={() => router.push("/admin/projects/new")}
            className="bg-[#8b4049] hover:bg-[#733540] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>

        {/* Projects Table */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <FolderEmptyIcon className="h-16 w-16 mx-auto text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
            <p className="text-muted-foreground mt-2">
              Get started by adding your first portfolio project.
            </p>
            <Button
              onClick={() => router.push("/admin/projects/new")}
              className="mt-6 bg-[#8b4049] hover:bg-[#733540] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-border">
              {projects.map((project, index) => (
                <div key={project.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {project.category}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.featured && (
                          <Badge className="text-[10px] bg-[#8b4049]/10 text-[#8b4049] border-[#8b4049]/20">
                            Featured
                          </Badge>
                        )}
                        <Badge
                          className={`text-[10px] ${
                            project.published
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          {project.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === projects.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>

                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-xs text-muted-foreground mr-1">Featured</span>
                      <Switch
                        checked={project.featured}
                        onCheckedChange={() => handleToggleFeatured(project.id)}
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-1">Published</span>
                      <Switch
                        checked={project.published}
                        onCheckedChange={() => handleTogglePublished(project.id)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/projects/${project.id}/edit`)
                      }
                      className="flex-1"
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(project.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Order</TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="h-6 w-6 p-0"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === projects.length - 1}
                            className="h-6 w-6 p-0"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-semibold text-sm">
                            {project.title}
                          </span>
                          {project.impact && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {project.impact}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">{project.category}</span>
                          {project.categoryTag && (
                            <span className="text-xs text-muted-foreground">
                              {project.categoryTag}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={project.featured}
                          onCheckedChange={() =>
                            handleToggleFeatured(project.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Switch
                            checked={project.published}
                            onCheckedChange={() =>
                              handleTogglePublished(project.id)
                            }
                          />
                          <span className="text-xs text-muted-foreground">
                            {project.published ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/admin/projects/${project.id}/edit`
                              )
                            }
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(project.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function FolderEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );
}
