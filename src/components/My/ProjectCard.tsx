import { useState } from 'react'
import { Project } from '@/types/project'
import FALLBACK_IMG from '@/assets/placeholder.svg'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const { status, title, thumbnail } = project
  const [imgError, setImgError] = useState(false)

  return (
    <div className='cursor-pointer border border-black/10 rounded-md overflow-hidden relative'>
      <span
        className={`absolute text-[10px] font-medium px-1.5 py-0.5 rounded-br-md text-black
          ${status === 'OPEN' ? 'bg-api-blue' : 'bg-api-green'}`}
      >
        {status}
      </span>

      {!thumbnail || imgError ? (
        <div className='h-50 w-full bg-gray-300/50 flex items-center justify-center'>
          <img src={FALLBACK_IMG} alt='placeholder' className='w-12 h-12 opacity-50' />
        </div>
      ) : (
        <img
          src={thumbnail}
          alt={title}
          onError={() => setImgError(true)}
          className='h-50 w-full object-cover'
        />
      )}

      <div className='px-3 py-2.25 text-sm font-medium bg-[#F2F7FA]'>{title}</div>
    </div>
  )
}
