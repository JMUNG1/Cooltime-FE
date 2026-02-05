import Title from '../common/Title'
import Plus from '@/assets/plus.svg?react'

export default function APISection() {
  return (
    <section>
      <Title size='lg' right={<Plus className='w-7 h-7 cursor-pointer' />}>
        API
      </Title>
    </section>
  )
}
