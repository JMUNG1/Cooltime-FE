import React from 'react'

const CategoryList = ({ data, color }) => {
  return (
    <div className='w-[343px] min-h-[65px] shadow-xs bg-white mb-4 rounded-2xl p-[11px]'>
      <div className='flex'>
        <div
          className={`flex flex-col justify-center items-center w-[43px] h-[43px] rounded-[27.5px] ${color} mr-4`}
        >
          <p className='Title-03-3_1 text-white'>{data.rank}</p>
        </div>
        <div className='flex flex-col items-start'>
          <p className='Title-02-2_2 text-black-400 -mt-0.5'>{data.categoryName}</p>
          <p className='body-03-1_3 text-gray-400 -mt-[5px]'>
            {data.totalCount}번 중 {data.postponedCount}번 미뤘어요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CategoryList
