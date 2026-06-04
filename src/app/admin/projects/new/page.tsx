"use client";

import { AdminNav } from "../../components/admin-nav";
import { ProjectForm } from "../components/project-form";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
            Add New Project
          </h1>
          <p className="text-muted-foreground mt-1">
            Create a new portfolio project
          </p>
        </div>

        <ProjectForm />
      </main>
    </div>
  );
}
