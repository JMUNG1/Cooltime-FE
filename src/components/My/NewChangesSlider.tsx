import { useState, useEffect } from 'react'
import SliderArrow from './SliderArrow'
import ProjectCard from './ProjectCard'
import Title from '../common/Title'
import { Project } from '@/types/project'

const items: Project[] = [
  { id: 1, status: 'OPEN', title: 'HACKATHON', thumbnail: '/images/hackathon.png' },
  { id: 2, status: 'OPEN', title: 'HACKATHON', thumbnail: '/images/hackathon.png' },
  { id: 3, status: 'OPEN', title: 'HACKATHON', thumbnail: '/images/hackathon.png' },
  { id: 4, status: 'OPEN', title: 'HACKATHON', thumbnail: '/images/hackathon.png' },
  { id: 5, status: 'OPEN', title: 'HACKATHON', thumbnail: '/images/hackathon.png' },
]

const CARD_W = 295
const GAP = 24

export default function NewChangesSlider() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    const calcVisible = () => {
      if (window.innerWidth < 640) setVisible(1)
      else if (window.innerWidth < 1024) setVisible(2)
      else if (window.innerWidth < 1280) setVisible(3)
      else setVisible(4)
    }

    calcVisible()
    window.addEventListener('resize', calcVisible)
    return () => window.removeEventListener('resize', calcVisible)
  }, [])

  const maxIndex = Math.max(items.length - visible, 0)

  return (
    <section className='relative mb-14 w-full'>
      <div className='max-w-7xl mx-32'>
        <Title>NEW CHANGES</Title>

        <div className='relative overflow-hidden w-full'>
          <div
            className='flex gap-6 transition-transform duration-300'
            style={{
              transform: `translateX(-${index * (CARD_W + GAP)}px)`,
            }}
          >
            {items.map((project) => (
              <div key={project.id} className='shrink-0 w-73.75'>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SliderArrow
        direction='left'
        disabled={index === 0}
        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
      />

      <SliderArrow
        direction='right'
        disabled={index === maxIndex}
        onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
      />
    </section>
  )
}
