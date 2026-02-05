export type ProjectStatus = 'OPEN' | 'UPDATE'

export interface Project {
  id: number
  title: string
  status: ProjectStatus
  thumbnail: string
}
