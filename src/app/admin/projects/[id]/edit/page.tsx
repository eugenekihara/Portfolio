"use client";

import { use } from "react";
import { AdminNav } from "../../../components/admin-nav";
import { ProjectForm } from "../../../components/project-form";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
            Edit Project
          </h1>
          <p className="text-muted-foreground mt-1">
            Update project details
          </p>
        </div>

        <ProjectForm projectId={id} />
      </main>
    </div>
  );
}
