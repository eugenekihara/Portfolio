/**
 * Fallback project order, used until (or if) /api/projects responds.
 * The live order comes from the database `order` field, the same source the
 * Projects section on the home page uses, so both always agree.
 */
export interface ProjectLink {
  slug: string;
  title: string;
}

export const PROJECT_SEQUENCE: ProjectLink[] = [
  { slug: "shamba-rahisi", title: "Shamba Rahisi" },
  { slug: "waveeatz", title: "WaveEatz" },
  { slug: "schoolpata", title: "SchooPata" },
  { slug: "portfolio", title: "Portfolio Website" },
  { slug: "trendz", title: "Trendz" },
];

export const PROJECT_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  PROJECT_SEQUENCE.map((p) => [p.slug, p.title])
);
