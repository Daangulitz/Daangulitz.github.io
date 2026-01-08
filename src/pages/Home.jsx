import { siteConfig } from "../siteConfig";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projectdata.json";

export default function Home() {
  const projects = projectData.projects;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        {/* Decorative glow behind photo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)] rounded-full blur-3xl opacity-20" />

        {/* Information */}
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          {/* Profile Image */}
          <img
            src={siteConfig.aboutImage}
            alt={siteConfig.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-[var(--accent)] shadow-lg mb-6"
          />

          {/* Name and role */}
          <h1 className="text-5xl font-bold text-[var(--text)] mb-2">{siteConfig.name}</h1>
          <p className="text-xl text-[var(--accent)] font-medium mb-4">{siteConfig.role}</p>

          {/* Tagline */}
          <p className="text-lg text-[var(--muted)] max-w-xl mb-8">{siteConfig.tagline}</p>
        </div>

        {/* Projects Section */}
        <div className="container mx-auto mt-12">
          <h2 className="text-3xl font-bold text-[var(--text)] mb-8 text-center">Mijn Projecten</h2>

          {/* Grid with ProjectCards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
