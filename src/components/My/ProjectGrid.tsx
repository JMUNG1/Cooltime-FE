import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

interface Props {
  items: Project[]
}

export default function ProjectGrid({ items }: Props) {
  return (
    <div className='grid grid-cols-4 gap-6 mb-17 min-h-115 items-start'>
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
