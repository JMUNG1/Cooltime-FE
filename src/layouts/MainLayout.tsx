import { Outlet } from 'react-router-dom'
import Blue from '@/assets/puzzle_blue.svg?react'
import Yellow from '@/assets/puzzle_yellow.svg?react'
import Red from '@/assets/puzzle_red.svg?react'

export default function MainLayout() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      <div className='pointer-events-none fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-main-gradient' />

        <Blue className='absolute -right-40 -top-70' />
        <Yellow className='absolute -left-40 -bottom-30' />
        <Red className='absolute -right-15 -bottom-40' />
      </div>

      <div className='relative z-10'>
        <Outlet />
      </div>
    </main>
  )
}
