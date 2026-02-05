import { Role } from '@/types/user'
import Avatar from '@/assets/profile.svg?react'

interface MemberCardProps {
  name: string
  email: string
  role?: Role
}

const ROLE_STYLE = {
  FRONTEND: {
    label: 'FRONTEND',
    badge: 'bg-[#93C2FF]/70 text-[#5d83b4]',
    card: 'bg-blue-50/60',
  },
  BACKEND: {
    label: 'BACKEND',
    badge: 'bg-[#FFE08B]/70 text-[#cfa83a]',
    card: 'bg-yellow-50/60',
  },
  PM: {
    label: 'PM',
    badge: 'bg-[#FFB8B9]/70 text-[#c46163]',
    card: 'bg-pink-50/60',
  },
  QA: {
    label: 'QA',
    badge: 'bg-[#49CC90]/70 text-[#579176]',
    card: 'bg-green-50/60',
  },
} as const

export default function MemberCard({ name, email, role }: MemberCardProps) {
  const style = role ? ROLE_STYLE[role] : null

  return (
    <div
      className={`flex items-center gap-4
        border border-black/10 rounded-lg px-5 py-4
        ${style?.card ?? 'bg-white/70'}`}
    >
      <Avatar className='w-12 h-12 shrink-0' />

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <div className='flex items-center justify-baseline gap-2 mb-0.5'>
            <p className='text-lg font-semibold leading-tight mb-0.5'>{name}</p>
            {style && (
              <span
                className={`inline-flex items-center justify-center
              text-[10px] leading-none font-light
              px-2 py-1 rounded-full mb-0.5
              ${style.badge}`}
              >
                {style.label}
              </span>
            )}
          </div>
          <p className='text-xs font-light text-gray-500'>{email}</p>
        </div>
      </div>
    </div>
  )
}
