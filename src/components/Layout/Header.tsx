import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='fixed top-0 left-0 z-50 w-full'>
      <div className='backdrop-blur-md bg-white/70 border-b border-gray-100'>
        <nav className='flex h-16 items-center justify-between px-10'>
          <Link to='/' className='text-xl font-extrabold tracking-tight font-Aquire'>
            PINGPONG
          </Link>

          <ul className='flex items-center gap-8 text-sm font-medium text-gray-700'>
            <li>
              <Link to='/' className='transition hover:text-black'>
                HOME
              </Link>
            </li>
            <li>
              <Link to='/mypage' className='transition hover:text-black'>
                MYPAGE
              </Link>
            </li>
            <li>
              <Link to='/login' className='transition hover:text-black'>
                LOGIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
