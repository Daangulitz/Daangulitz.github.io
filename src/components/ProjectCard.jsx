import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block bg-[var(--surface)] rounded-lg overflow-hidden border border-[var(--bordercolor)] hover:border-[var(--accent)] transition-all duration-300"
    >
      {/* Thumbnail with overlay */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--overlay)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-[var(--text)] font-semibold">Bekijk Project →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted)] line-clamp-2">{project.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
