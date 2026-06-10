"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

/* ─── Fade-in Wrapper ─── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project Data Interface ─── */
interface ProjectData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string | null;
  category: string;
  categoryTag: string | null;
  technologies: string;
  thumbnail: string;
  additionalImages: string | null;
  githubUrl: string | null;
  liveDemoUrl: string | null;
  completionDate: string | null;
  impact: string | null;
  caseStudyHref: string | null;
  featured: boolean;
  order: number;
}

/* ─── Dynamic Project Page ─── */
export default function DynamicProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>("");
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const techList = project.technologies.split(",").map((t) => t.trim());
  const additionalImages = project.additionalImages
    ? project.additionalImages.split(",").filter(Boolean)
    : [];
  const isExternalLink = project.caseStudyHref?.startsWith("http");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]"
            >
              Eugene<span className="text-accent">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Back Button */}
      <FadeIn delay={0.1}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground/5 hover:bg-foreground/10 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-24">
        {/* Hero Title */}
        <FadeIn delay={0.2}>
          <div className="pt-4 pb-8">
            <h1 className="text-7xl sm:text-8xl lg:text-[128px] font-bold leading-[0.85] tracking-tight font-[family-name:var(--font-poppins)]">
              <span className="text-foreground">{project.title}</span>
            </h1>
          </div>
        </FadeIn>

        {/* Project Metadata Bar */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-foreground/10 rounded-2xl overflow-hidden">
            {[
              { label: "Category", value: project.category, dark: false },
              { label: "Role", value: project.categoryTag || "Designer", dark: false },
              { label: "Timeline", value: project.completionDate ? new Date(project.completionDate).getFullYear().toString() : "2025", dark: true },
              { label: "Platform", value: "Mobile / Web", dark: true },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`relative px-6 py-5 ${
                  item.dark
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                } ${i < 3 ? "border-r border-foreground/10" : ""}`}
              >
                <p
                  className={`text-xs tracking-[0.2em] uppercase mb-1 font-medium ${
                    item.dark
                      ? "text-background/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`font-bold font-[family-name:var(--font-poppins)] text-lg ${
                    item.dark ? "text-background" : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Two-Column Layout: Image + Description */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Project Image */}
          <FadeIn delay={0.4}>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-secondary">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </FadeIn>

          {/* Right: Description */}
          <FadeIn delay={0.5}>
            <div className="space-y-6">
              {/* Short Description */}
              <div className="bg-secondary/50 rounded-2xl p-8">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4">
                  Overview
                </h3>
                <p className="text-foreground/80 leading-[1.7] text-base">
                  {project.shortDescription}
                </p>
              </div>

              {/* Detailed Description */}
              {(project.detailedDescription || project.impact) && (
                <div className="bg-secondary/50 rounded-2xl p-8">
                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4">
                    The Solution
                  </h3>
                  {project.detailedDescription && (
                    <p className="text-foreground/80 leading-[1.7] text-base">
                      {project.detailedDescription}
                    </p>
                  )}

                  {/* Impact */}
                  {project.impact && (
                    <div className="mt-4 inline-flex items-center gap-2 border-2 border-accent/40 bg-accent/10 px-4 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span className="text-accent text-xs font-bold tracking-wider uppercase">
                        {project.impact}
                      </span>
                    </div>
                  )}

                  {/* Case Study Link */}
                  {project.caseStudyHref && (
                    <div className="mt-6">
                      <a
                        href={project.caseStudyHref}
                        {...(isExternalLink
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-300"
                      >
                        Read full case study
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Additional Images */}
        {additionalImages.length > 0 && (
          <FadeIn delay={0.6}>
            <div className="mt-16">
              <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6">
                Project Gallery
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalImages.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden shadow-lg border border-border"
                  >
                    <img
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Tech Stack */}
        <FadeIn delay={0.65}>
          <div className="mt-16">
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {techList.map((tech) => (
                <span
                  key={tech}
                  className="text-sm font-medium tracking-wider uppercase text-muted-foreground border-2 border-border px-4 py-2 rounded-lg hover:border-accent/50 hover:text-accent transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Links */}
        {(project.githubUrl || project.liveDemoUrl) && (
          <FadeIn delay={0.7}>
            <div className="mt-16 flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300"
                >
                  View on GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border bg-transparent px-6 py-3 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Live Demo
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
