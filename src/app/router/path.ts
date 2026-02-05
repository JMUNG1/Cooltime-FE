export type TeamRole = 'frontend' | 'backend' | 'pm'

export const PATH = {
  home: '/',
  login: '/login',
  signup: '/signup',
  users: '/users',
  my: '/mypage',
  team: {
    create: '/team/create',
    detail: (teamId: string | number) => `/team/${teamId}`,
    role: (teamId: string | number, role: TeamRole) => `/team/${teamId}/${role}`,
  },
} as const
