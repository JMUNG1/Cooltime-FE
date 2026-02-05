export type Role = 'Front' | 'Back' | 'PM' | 'QA'

export interface User {
  id: number
  name: string
  email: string
  role?: Role
  pofile?: string
}
