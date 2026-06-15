"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import MDXEditor to avoid SSR issues
const MDXEditorDynamic = dynamic(
  () => import("@mdxeditor/editor").then((mod) => mod.MDXEditor),
  { ssr: false, loading: () => <div className="h-64 border rounded-lg animate-pulse bg-muted" /> }
);

// Import styles only on client
if (typeof window !== "undefined") {
  import("@mdxeditor/editor/style.css");
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 border rounded-lg animate-pulse bg-muted" />
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden rich-text-editor">
      <MDXEditorDynamic
        markdown={value || ""}
        onChange={onChange}
        placeholder={placeholder || "Write your content here..."}
        contentEditableClassName="prose prose-sm max-w-none min-h-[200px] p-4 focus:outline-none"
      />
    </div>
  );
}
