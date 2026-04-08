import { Link } from "react-router-dom";

export default function ProjectInfo({ project }) {
  const paragraphs = project.description.split("\n\n");

  return (
    <div className="mb-4 border-b border-[var(--bordercolor)] pb-8 mx-4">
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--text)]">Over dit project</h2>

          {paragraphs.map((text, i) => (
            <p key={i} className="leading-relaxed text-[var(--muted)]">
              {text}
            </p>
          ))}
        </div>

        {/* Project details sidebar */}
        <div className="h-fit md:self-start">
          <h3 className="text-xl font-semibold mb-4 text-[var(--text)] border-b border-[var(--bordercolor)] pb-2">
            Details
          </h3>

          <ul className="text-sm space-y-2 text-[var(--muted)]">
            <li className="flex justify-between border-b border-[var(--bordercolor)] pb-1">
              <span className="font-medium text-[var(--text)]">Rol</span>
              <span>{project.projectRole}</span>
            </li>

            <li className="flex justify-between border-b border-[var(--bordercolor)] pb-1">
              <span className="font-medium text-[var(--text)]">Tijdlijn</span>
              <span>{project.timeline}</span>
            </li>

            <li className="flex justify-between items-center pb-1">
              <span className="font-medium text-[var(--text)]">Tags</span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {project.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/?tag=${encodeURIComponent(tag)}`}
                    className="px-2 py-1 text-xs bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          {/* Action buttons */}
          {(project.git || project.itch) && (
            <div className="mt-4 flex gap-2 justify-end">
              {project.git && (
                <a
                  href={project.git}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[var(--surface)] border border-[var(--bordercolor)] rounded-lg hover:border-[var(--accent)] text-sm transition-colors"
                >
                  GitHub
                </a>
              )}
              {project.itch && (
                <a
                  href={project.itch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[var(--accent)] text-[var(--accent-text)] rounded-lg hover:bg-[var(--accent-hover)] text-sm transition-colors"
                >
                  Itch.io
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
