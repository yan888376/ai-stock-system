'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface MarketData {
  index: string
  name: string
  value: number
  change: number
  changePercent: number
  season: string
}

interface MarketOverviewProps {
  isLoading: boolean
}

const mockMarketData: MarketData[] = [
  {
    index: 'SH000001',
    name: '上证指数',
    value: 3087.45,
    change: 15.23,
    changePercent: 0.49,
    season: '春天'
  },
  {
    index: 'SZ399001',
    name: '深证成指',
    value: 9876.32,
    change: -8.45,
    changePercent: -0.09,
    season: '夏天'
  },
  {
    index: 'SZ399006',
    name: '创业板指',
    value: 2156.78,
    change: 23.45,
    changePercent: 1.10,
    season: '春天'
  }
]

export default function MarketOverview({ isLoading }: MarketOverviewProps) {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [averageStockSeason, setAverageStockSeason] = useState('春天')

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setMarketData(mockMarketData)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="card">
        <div className="loading-skeleton h-6 w-32 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="loading-skeleton h-4 w-20"></div>
              <div className="loading-skeleton h-4 w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
        市场环境分析
      </h3>
      
      {/* 市场整体环境 */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-800">市场整体环境</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            适宜春天选股
          </span>
        </div>
        <div className="text-xs text-green-700">
          <p>平均股价处于{averageStockSeason}阶段，个股表现活跃，适合运用春天选股法</p>
        </div>
      </div>

      {/* 主要指数 */}
      <div className="space-y-3">
        {marketData.map((item) => (
          <div key={item.index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800 text-sm">{item.name}</div>
              <div className="text-xs text-gray-600 flex items-center space-x-2 mt-1">
                <span>当前: {item.season}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  item.season === '春天' ? 'bg-green-100 text-green-600' : 
                  item.season === '夏天' ? 'bg-orange-100 text-orange-600' :
                  item.season === '秋天' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {item.season}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono-nums font-medium text-gray-800">
                {item.value.toFixed(2)}
              </div>
              <div className={`flex items-center text-xs font-medium ${
                item.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change >= 0 ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                <span>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                  ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 市场统计 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="text-lg font-bold text-green-700">68%</div>
            <div className="text-xs text-green-600">个股处于春天</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="text-lg font-bold text-blue-700">23</div>
            <div className="text-xs text-blue-600">今日新增信号</div>
          </div>
        </div>
      </div>
    </div>
  )
}