"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AdminNav } from "../components/admin-nav";
import { MessagesContent } from "./messages-content";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#8b4049]" />
            </div>
          }
        >
          <MessagesContent />
        </Suspense>
      </main>
    </div>
  );
}
