import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="group">
      <div className="bg-[var(--card)] border border-[var(--bordercolor)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-colors shadow-lg">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-[var(--background)]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          />
        </div>

        {/* Content Container */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{project.title}</h3>
          <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">{project.tagline}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[var(--accent)] text-white px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}