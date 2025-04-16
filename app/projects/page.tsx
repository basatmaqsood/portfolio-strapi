import ProjectCard from "@/components/project-card"
import { projects } from "@/lib/data"
import MainContent from "@/components/main-content"

export default function ProjectsPage() {
  return (
    <MainContent
      title="My Projects"
      subtitle="Explore my recent work and see how I transform ideas into beautifully crafted digital experiences"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </MainContent>
  )
}
