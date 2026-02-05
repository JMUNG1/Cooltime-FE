import { useState } from 'react'
import InviteCard from './InviteCard'
import Title from '../common/Title'
import Plus from '@/assets/plus.svg?react'
import InviteModal from './InviteModal'
import { User } from '@/types/user'

export default function InviteSection() {
  const [isOpen, setOpen] = useState(false)
  const [members, setMembers] = useState<User[]>([])

  return (
    <section>
      <Title
        size='lg'
        right={<Plus onClick={() => setOpen(true)} className='w-7 h-7 cursor-pointer' />}
      >
        ALL
      </Title>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        {members.map((member) => (
          <InviteCard key={member.id} name={member.name} email={member.email} />
        ))}
      </div>

      {isOpen && (
        <InviteModal
          onClose={() => setOpen(false)}
          onInvite={(invited) => {
            setMembers((prev) => [...prev, ...invited])
            setOpen(false)
          }}
        />
      )}
    </section>
  )
}
