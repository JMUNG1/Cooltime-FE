import { useState } from 'react'
import ProjectGrid from './ProjectGrid'
import Pagination from './Pagination'
import { Project } from '@/types/project'
import Title from '../common/Title'
import SearchInput from '../common/SearchInput'

const dummy: Project[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  title: 'HACKATHON',
  status: i % 2 === 0 ? 'OPEN' : 'UPDATE',
  thumbnail: '/images/hackathon.png',
}))

export default function AllProjectsSection() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  const filtered = dummy.filter((project) =>
    project.title.toLowerCase().includes(query.toLowerCase()),
  )

  const start = (page - 1) * PER_PAGE
  const items = filtered.slice(start, start + PER_PAGE)

  return (
    <section className='mx-32 mb-20'>
      <Title right={<SearchInput value={query} onChange={setQuery} />}>ALL</Title>

      <ProjectGrid items={items} />

      <Pagination current={page} total={Math.ceil(filtered.length / PER_PAGE)} onChange={setPage} />
    </section>
  )
}
