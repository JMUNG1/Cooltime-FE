import React from 'react'
import { useUserStore } from '@/store/store'
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const BarChart = ({ data }) => {
  const { theme } = useUserStore()
  const color = {
    blue: '#C8CEFF',
    mint: '#AEE1D1',
    peach: '#FFD6B3',
  }
  const chartColor = color[theme] ?? '#C8CEFF'
  return (
    <div className='w-[343px] h-[300px] min-w-[100px] min-h-[100px] focus:outline-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <ReBarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          barCategoryGap='30%'
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray='3 3'
            stroke='#E5E7EB'
          />

          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#A3A3A3', fontSize: 12 }}
            tickFormatter={(month) => `${month}월`}
          />

          <YAxis hide />

          <Tooltip
            cursor={{ fill: 'rgba(165,180,252,0.15)' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              fontSize: 12,
            }}
            formatter={(value) => [`${value}%`, '미룸 비율']}
          />

          <Bar dataKey='postponedPercent' fill={chartColor} radius={[5, 5, 0, 0]} barSize={18} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart
