import LinkItem from './LinkItem'
import Title from '../common/Title'

import SwaggerIcon from '@/assets/swagger.svg?react'
import FigmaIcon from '@/assets/figma.svg?react'
import DiscordIcon from '@/assets/discord.svg?react'
import GithubIcon from '@/assets/github.svg?react'

export default function LinkSection() {
  return (
    <section>
      <Title size='lg'>LINKS</Title>

      <div className='grid grid-cols-2 gap-x-5 gap-y-4'>
        <LinkItem
          label='Swagger'
          placeholder='https://swagger.io/...'
          icon={<SwaggerIcon className='w-5 h-5 text-black/70' />}
        />
        <LinkItem
          label='Figma'
          placeholder='https://figma.com/...'
          icon={<FigmaIcon className='w-5 h-5 text-black/70' />}
        />
        <LinkItem
          label='Discord'
          placeholder='https://discord.gg/...'
          icon={<DiscordIcon className='w-5 h-5 text-black/70' />}
        />
        <LinkItem
          label='GitHub'
          placeholder='https://github.com/...'
          icon={<GithubIcon className='w-5 h-5 text-black/70' />}
        />
      </div>
    </section>
  )
}
