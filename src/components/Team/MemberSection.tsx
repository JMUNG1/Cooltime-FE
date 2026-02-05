import { useState } from 'react'
import { User } from '@/types/user'
import Title from '../common/Title'
import Plus from '@/assets/plus.svg?react'
import MemberCard from './MemberCard'
import InviteModal from './InviteModal'

export default function MemberSection({ members }: { members: User[] }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <section>
      <Title
        size='lg'
        right={<Plus onClick={() => setOpen(true)} className='w-7 h-7 cursor-pointer' />}
      >
        TEAM MEMBER
      </Title>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        {members.map((member) => (
          <MemberCard key={member.id} {...member} />
        ))}
      </div>

      {isOpen && <InviteModal onClose={() => setOpen(false)} />}
    </section>
  )
}
