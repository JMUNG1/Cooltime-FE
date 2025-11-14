import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/store'
import Header from '@/components/shared/Header'
import CategoryList from '@/components/category/CategoryList'
import { useNavigate } from 'react-router-dom'
import { getCategoryData } from '@/apis/report/categoryList'
import { motion, easeOut } from 'framer-motion'

const CategoryPage = () => {
  const { theme, nickname } = useUserStore()
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryData()
        setData(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const color = {
    blue: {
      background: 'bg-linear-to-b from-blue-200 to-gray-100',
      number: 'bg-blue-500',
    },
    mint: {
      background: 'bg-linear-to-b from-mint-200 to-gray-100',
      number: 'bg-mint-500',
    },
    peach: {
      background: 'bg-linear-to-b from-peach-200 to-gray-100',
      number: 'bg-peach-500',
    },
  }
  const background = color[theme]?.background ?? 'bg-linear-to-b from-blue-200 to-gray-100'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  }

  return (
    <div className='flex flex-col items-center'>
      <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${background}`}>
        <Header label='카테고리별' />
        <div className='flex flex-col w-full items-start mt-[94px] pl-4 mb-10'>
          <p className='Title-01-1_1 text-black-400'>카테고리별로</p>
          <p className='Title-01-1_1 text-black-400'>{nickname}님이</p>
          <p className='Title-01-1_1 text-black-400'>미룬 비율이에요</p>
          <p className='body-02-1_2 text-gray-900 mt-4'>내가 자주 미룬 카테고리를 확인하고,</p>
          <p className='body-02-1_2 text-gray-900 -mt-1'>집중이 필요한 패턴을 찾아보세요.</p>
        </div>
        {data ? (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='w-full flex flex-col gap-2 items-center'
          >
            {data.categoryRankItems.map((item, index) => (
              <motion.div key={item.categoryId} variants={itemVariants}>
                <CategoryList data={item} color={color[theme]?.number} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
