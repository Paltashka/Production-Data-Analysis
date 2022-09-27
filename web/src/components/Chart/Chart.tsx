import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/useAppContext';
import { barChartItems } from '../../utils/barChartItems';
import './index.scss'

const Chart = () => {
  const { activeTab, activeTabId } = useAppContext()
  const [barCharts, setBarCharts] = useState(barChartItems)

  useEffect(() => {
    activeTabId === 3
      ? setBarCharts(barChartItems.slice(1))
      : setBarCharts(barChartItems)
  }, [activeTabId])

  return (
    <div className='chart'>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={activeTab}
          margin={{
            right: 30,
            bottom: 5,
          }}
        >
          <XAxis dataKey="status" />
          <YAxis />
          <Legend />
          {barCharts.map((item, index) => (
            <Bar
              key={index}
              dataKey={item.dataKey}
              stackId={activeTabId !== 2 ? "a" : undefined}
              fill={item.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
