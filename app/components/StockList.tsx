'use client'

import { useState, useEffect } from 'react'
import { ChevronUpIcon, ChevronDownIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface Stock {
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  pattern: 'M底' | 'W顶' | '上涨趋势' | '横盘整理' | '下跌趋势'
  score: number
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell'
  targetPrice: number
  riskLevel: 'low' | 'medium' | 'high'
  holdingPeriod: string
  reason: string
}

interface StockListProps {
  isLoading: boolean
}

// 模拟股票数据
const mockStocks: Stock[] = [
  {
    code: '000001',
    name: '平安银行',
    price: 12.45,
    change: 0.23,
    changePercent: 1.88,
    season: 'spring',
    pattern: 'M底',
    score: 8.5,
    recommendation: 'strong_buy',
    targetPrice: 16.80,
    riskLevel: 'low',
    holdingPeriod: '2-3年',
    reason: '突破M底形态，成交量放大确认，基本面稳健'
  },
  {
    code: '000002',
    name: '万科A',
    price: 8.92,
    change: 0.15,
    changePercent: 1.71,
    season: 'spring',
    pattern: '上涨趋势',
    score: 8.2,
    recommendation: 'buy',
    targetPrice: 12.50,
    riskLevel: 'medium',
    holdingPeriod: '3-5年',
    reason: '春天趋势确立，政策利好，估值偏低'
  },
  {
    code: '600036',
    name: '招商银行',
    price: 35.67,
    change: 0.89,
    changePercent: 2.56,
    season: 'spring',
    pattern: 'M底',
    score: 9.1,
    recommendation: 'strong_buy',
    targetPrice: 48.00,
    riskLevel: 'low',
    holdingPeriod: '2-4年',
    reason: 'M底形态完美，业绩持续增长，股息率稳定'
  },
  {
    code: '000858',
    name: '五粮液',
    price: 128.45,
    change: -1.25,
    changePercent: -0.96,
    season: 'spring',
    pattern: '横盘整理',
    score: 7.8,
    recommendation: 'buy',
    targetPrice: 180.00,
    riskLevel: 'medium',
    holdingPeriod: '3-7年',
    reason: '春天趋势初现，品牌价值稳固，长期看好'
  },
  {
    code: '600519',
    name: '贵州茅台',
    price: 1678.88,
    change: 12.45,
    changePercent: 0.75,
    season: 'spring',
    pattern: 'M底',
    score: 8.9,
    recommendation: 'strong_buy',
    targetPrice: 2200.00,
    riskLevel: 'low',
    holdingPeriod: '5-7年',
    reason: '经典M底突破，消费复苏预期，护城河深厚'
  }
]

const getSeasonColor = (season: string) => {
  switch (season) {
    case 'spring': return 'text-green-600 bg-green-50'
    case 'summer': return 'text-orange-600 bg-orange-50'
    case 'autumn': return 'text-red-600 bg-red-50'
    case 'winter': return 'text-blue-600 bg-blue-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getRecommendationColor = (rec: string) => {
  switch (rec) {
    case 'strong_buy': return 'text-green-700 bg-green-100'
    case 'buy': return 'text-blue-700 bg-blue-100'
    case 'hold': return 'text-yellow-700 bg-yellow-100'
    case 'sell': return 'text-red-700 bg-red-100'
    default: return 'text-gray-700 bg-gray-100'
  }
}

const getRecommendationText = (rec: string) => {
  switch (rec) {
    case 'strong_buy': return '强烈买入'
    case 'buy': return '买入'
    case 'hold': return '持有'
    case 'sell': return '卖出'
    default: return '观望'
  }
}

export default function StockList({ isLoading }: StockListProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [sortBy, setSortBy] = useState<'score' | 'change' | 'code'>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!isLoading) {
      // 模拟数据加载延迟
      const timer = setTimeout(() => {
        setStocks(mockStocks)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const handleSort = (field: 'score' | 'change' | 'code') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const toggleWatchlist = (code: string) => {
    const newWatchlist = new Set(watchlist)
    if (newWatchlist.has(code)) {
      newWatchlist.delete(code)
    } else {
      newWatchlist.add(code)
    }
    setWatchlist(newWatchlist)
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    let valueA, valueB
    
    switch (sortBy) {
      case 'score':
        valueA = a.score
        valueB = b.score
        break
      case 'change':
        valueA = a.changePercent
        valueB = b.changePercent
        break
      case 'code':
        valueA = a.code
        valueB = b.code
        break
      default:
        valueA = a.score
        valueB = b.score
    }

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="loading-skeleton h-8 w-48"></div>
            <div className="loading-skeleton h-6 w-24"></div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="loading-skeleton h-6 w-32"></div>
                  <div className="loading-skeleton h-5 w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="loading-skeleton h-4 w-full"></div>
                  <div className="loading-skeleton h-4 w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
            <FireIcon className="w-7 h-7 text-orange-500 mr-2" />
            春天选股推荐
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({stocks.length} 只股票)
            </span>
          </h2>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">排序:</span>
            <button
              onClick={() => handleSort('score')}
              className={`px-3 py-1 rounded-md transition-colors ${
                sortBy === 'score' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              评分 {sortBy === 'score' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => handleSort('change')}
              className={`px-3 py-1 rounded-md transition-colors ${
                sortBy === 'change' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              涨幅 {sortBy === 'change' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {sortedStocks.map((stock) => (
            <div
              key={stock.code}
              className="stock-card bullish group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                
                {/* 左侧：基本信息 */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleWatchlist(stock.code)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {watchlist.has(stock.code) ? (
                      <StarSolid className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {stock.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {stock.code}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(stock.season)}`}>
                        春天
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>形态: {stock.pattern}</span>
                      <span>•</span>
                      <span>风险: {stock.riskLevel === 'low' ? '低' : stock.riskLevel === 'medium' ? '中' : '高'}</span>
                      <span>•</span>
                      <span>持有期: {stock.holdingPeriod}</span>
                    </div>
                  </div>
                </div>

                {/* 中间：价格信息 */}
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-800 font-mono-nums">
                      ¥{stock.price.toFixed(2)}
                    </div>
                    <div className={`flex items-center justify-end text-sm font-medium ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                      <span>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                        ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">目标价</div>
                    <div className="text-lg font-semibold text-blue-600 font-mono-nums">
                      ¥{stock.targetPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      +{(((stock.targetPrice - stock.price) / stock.price) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* 右侧：评分和建议 */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">AI评分</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {stock.score.toFixed(1)}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {stock.score >= 9 ? 'A+' : stock.score >= 8 ? 'A' : stock.score >= 7 ? 'B' : 'C'}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRecommendationColor(stock.recommendation)}`}>
                    {getRecommendationText(stock.recommendation)}
                  </span>
                </div>
              </div>

              {/* 底部：分析理由 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">分析理由: </span>
                  {stock.reason}
                </div>
              </div>
            </div>
          ))}
        </div>

        {stocks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FireIcon className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">暂无春天选股推荐</p>
              <p className="text-sm">系统正在分析市场数据...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}