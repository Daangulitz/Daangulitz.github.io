import { siteConfig } from "../siteConfig";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState("projects");
  const tagParam = searchParams.get("tag");
  const tagsParam = searchParams.get("tags");
  const selectedTagsFromParam = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  const selectedTags = selectedTagsFromParam.length > 0 ? selectedTagsFromParam : tagParam ? [tagParam] : [];
  const projects = projectData.projects;

  const visibleProjects = activeProjectTab === "gamejam"
    ? projects.filter((project) => project.tags.includes("GameJam"))
    : projects.filter((project) => !project.tags.includes("GameJam"));

  const allTags = Array.from(
    new Set(visibleProjects.flatMap((project) => project.tags))
  ).sort();

  const filteredProjects = selectedTags.length > 0
    ? visibleProjects.filter((project) => project.tags.some((tag) => selectedTags.includes(tag)))
    : visibleProjects;

  const toggleTag = (tag) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (nextTags.length === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ tags: nextTags.join(",") });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        {/* Decorative glow behind photo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)] rounded-full blur-3xl opacity-20" />

        {/* Information */}
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-8">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold text-[var(--text)] mb-2">{siteConfig.name}</h1>
              <p className="text-xl text-[var(--accent)] font-medium mb-4">{siteConfig.role}</p>
              <p className="text-lg text-[var(--muted)] max-w-xl">{siteConfig.tagline}</p>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src={siteConfig.aboutImage}
                alt={siteConfig.name}
                className="w-96 h-56 rounded-xl object-contain shadow-lg bg-[var(--background)] outline-2 outline-[var(--accent)]"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="container mx-auto mt-12">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text)]">My projects</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveProjectTab("projects")}
                  className={`px-4 py-2 rounded-lg border transition ${activeProjectTab === "projects"
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-[var(--surface)] text-[var(--text)] border-[var(--bordercolor)] hover:bg-[var(--accent)] hover:text-white"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveProjectTab("gamejam")}
                  className={`px-4 py-2 rounded-lg border transition ${activeProjectTab === "gamejam"
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-[var(--surface)] text-[var(--text)] border-[var(--bordercolor)] hover:bg-[var(--accent)] hover:text-white"
                  }`}
                >
                  Game Jam
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="px-4 py-2 rounded-lg border border-[var(--bordercolor)] bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              {isFilterOpen ? "Close filters" : "Show filters"}
            </button>
          </div>

          {isFilterOpen && (
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsFilterOpen(false)} />
          )}

          {isFilterOpen && (
            <aside className="fixed right-0 top-0 h-full w-72 bg-[var(--bg)] border-l border-[var(--bordercolor)] z-50 p-4 overflow-auto">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)]"
                >
                  ✕
                </button>
              </div>

              <p className="mb-3 text-sm text-[var(--muted)]">Click a tag to filter.</p>

              <div className="flex flex-col gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      toggleTag(tag);
                    }}
                    className={`px-3 py-2 rounded-md text-left border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--surface)] text-[var(--text)] border-[var(--bordercolor)] hover:bg-[var(--accent)] hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setSearchParams({});
                    setIsFilterOpen(false);
                  }}
                  className="mt-2 px-3 py-2 rounded-md border border-[var(--bordercolor)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white"
                >
                  Clear all filters
                </button>
              </div>
            </aside>
          )}

          {selectedTags.length > 0 && (
            <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-[var(--muted)]">
              <span>
                Filtered by tags: <strong className="text-[var(--text)]">{selectedTags.join(", ")}</strong>
              </span>
              <button
                onClick={() => setSearchParams({})}
                className="px-3 py-1 rounded-md border border-[var(--bordercolor)] hover:bg-[var(--surface)]"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Grid with ProjectCards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
