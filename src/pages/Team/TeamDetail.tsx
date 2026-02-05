import MemberSection from '@/components/Team/MemberSection'
import APISection from '@/components/Team/APISection'

import NotionIcon from '@/assets/notion.svg?react'
import SwaggerIcon from '@/assets/swagger.svg?react'
import FigmaIcon from '@/assets/figma.svg?react'
import DiscordIcon from '@/assets/discord.svg?react'
import GithubIcon from '@/assets/github.svg?react'

import { User } from '@/types/user'

const TEAM_INFO = {
  name: 'HACKATHON',
  members: [
    {
      id: 1,
      name: '김프론트',
      email: 'seeun3139@sookmyung.ac.kr',
      role: 'FRONTEND',
    },
    {
      id: 2,
      name: '이백엔드',
      email: 'sookmyung.ac.kr',
      role: 'BACKEND',
    },
    {
      id: 3,
      name: '박기획',
      email: 'sookmyung.ac.kr',
      role: 'PM',
    },
    {
      id: 4,
      name: '박기획',
      email: 'sookmyung.ac.kr',
      role: 'QA',
    },
  ] as User[],
  links: {
    notion: 'https://notion.so',
    figma: 'https://figma.com',
    github: 'https://github.com',
    discord: 'https://discord.gg',
    swagger: '',
  },
}

const TEAM_LINK_ICONS = {
  notion: NotionIcon,
  figma: FigmaIcon,
  github: GithubIcon,
  discord: DiscordIcon,
  swagger: SwaggerIcon,
} as const

export default function TeamDetailPage() {
  return (
    <main className='mx-auto max-w-250 px-6 py-30'>
      <div>
        <h1 className='font-extrabold text-3xl'>{TEAM_INFO.name}</h1>
        <div className='mt-4 flex items-center gap-2.5'>
          {Object.entries(TEAM_INFO.links).map(([key, url]) => {
            if (!url) return null

            const Icon = TEAM_LINK_ICONS[key as keyof typeof TEAM_LINK_ICONS]

            return (
              <a key={key} href={url} target='_blank' rel='noopener noreferrer'>
                <Icon className='h-8 w-8' />
              </a>
            )
          })}
        </div>
      </div>

      <div className='mt-20 space-y-16'>
        <MemberSection members={TEAM_INFO.members} />
        <APISection />
      </div>
    </main>
  )
}
