import { type Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onViewDetails: (id: string) => void;
}

export function ProjectGrid({ projects, onViewDetails }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}