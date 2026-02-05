import Avatar from '@/assets/profile.svg?react'

export default function ProfileSection() {
  return (
    <section className='flex items-center gap-6 py-10 px-32 mb-6'>
      <Avatar className='w-20 h-20' />

      <div>
        <h1 className='text-2xl font-bold mb-2'>PARKSEEUN</h1>
        <p className='text-gray-500 text-sm'>seeun3139@sookmyung.ac.kr</p>
      </div>
    </section>
  )
}
