import { useState } from 'react'
import { User } from '@/types/user'
import Modal from '../common/Modal'
import Button from '../common/Button'

const USERS: User[] = [
  { id: 1, name: 'PARK SEEUN', email: 'seeun3139@sookmyung.ac.kr' },
  { id: 2, name: 'KIM MINJI', email: 'minji@sookmyung.ac.kr' },
  { id: 3, name: 'LEE JIWON', email: 'jiwon@sookmyung.ac.kr' },
  { id: 4, name: 'CHOI YUNA', email: 'yuna@sookmyung.ac.kr' },
]

interface Props {
  onClose: () => void
  onInvite?: (users: User[]) => void
}

export default function InviteModal({ onClose, onInvite }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<User[]>([])

  const filteredUsers = USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()),
  ).filter((user) => !selected.find((s) => s.id === user.id))

  const addUser = (user: User) => {
    setSelected([...selected, { ...user, role: 'Front' }])
    setQuery('')
  }

  return (
    <Modal title='INVITE' bg='bg-gradient-to-b from-api-blue/10 to-white' onClose={onClose}>
      <p className='mb-4 text-[12px] text-gray-500'>Start PINGPONG with your team member</p>

      <div className='relative mb-4'>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search by name or email'
          className='w-full rounded-md border border-black/20 px-3 py-2 text-sm focus:border-api-blue focus:shadow-blue focus:outline-none'
        />

        {query && filteredUsers.length > 0 && (
          <ul className='absolute z-10 mt-1 w-full rounded-md border border-black/20 bg-white shadow'>
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => addUser(user)}
                className='cursor-pointer px-3 py-2 text-sm hover:bg-gray-100'
              >
                <p className='font-medium mb-1'>{user.name}</p>
                <p className='font-light text-xs text-gray-400'>{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='space-y-2 mb-4'>
        {selected.map((user) => (
          <div
            key={user.id}
            className='flex items-center justify-between rounded-md bg-white/50 border border-black/20 px-3 py-2'
          >
            <div>
              <p className='text-sm font-medium mb-0.5'>{user.name}</p>
              <p className='font-light text-xs text-gray-400'>{user.email}</p>
            </div>

            <select
              className='rounded-md border border-black/20 px-2 py-1 text-sm'
              value={user.role}
              onChange={(e) =>
                setSelected((prev) =>
                  prev.map((u) =>
                    u.id === user.id ? { ...u, role: e.target.value as User['role'] } : u,
                  ),
                )
              }
            >
              <option>Front</option>
              <option>Back</option>
              <option>PM</option>
              <option>QA</option>
            </select>
          </div>
        ))}
      </div>

      <Button
        className='w-full'
        disabled={selected.length === 0}
        onClick={() => onInvite(selected)}
      >
        INVITE
      </Button>
    </Modal>
  )
}
