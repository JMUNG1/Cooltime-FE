interface InviteCardProps {
  name: string
  email: string
}

export default function InviteCard({ name, email }: InviteCardProps) {
  return (
    <div className='bg-white/70 border border-black/10 rounded-lg px-6 py-5'>
      <p className='text-lg font-medium mb-2'>{name}</p>
      <p className='font-light text-sm text-gray-600'>{email}</p>
    </div>
  )
}
