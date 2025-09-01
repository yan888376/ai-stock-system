'use client'

import { useState, useEffect } from 'react'
import { ChartBarIcon, SparklesIcon, ArrowTrendingUpIcon, ClockIcon } from '@heroicons/react/24/outline'
import StockList from './components/StockList'
import MarketOverview from './components/MarketOverview'
import StrategyCards from './components/StrategyCards'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false)
      setLastUpdate(new Date().toLocaleString('zh-CN'))
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <SparklesIcon className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
                AI智能选股系统
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              基于师傅<strong>春天选股法</strong>的AI智能分析系统<br />
              发现处于春天上涨趋势的潜力股票，助您把握长期投资机会
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ClockIcon className="w-4 h-4" />
                <span>最后更新: {lastUpdate || '加载中...'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">系统运行正常</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 左侧：策略概览和市场分析 */}
            <div className="lg:col-span-4 space-y-8">
              {/* 策略卡片 */}
              <StrategyCards />
              
              {/* 市场概览 */}
              <MarketOverview isLoading={isLoading} />
              
              {/* 系统特色 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500 mr-2" />
                  系统特色
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">四季轮回识别</p>
                      <p className="text-xs text-gray-600">智能识别股票所处的春夏秋冬阶段</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">M底W顶分析</p>
                      <p className="text-xs text-gray-600">精准识别关键技术形态</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">长期持有策略</p>
                      <p className="text-xs text-gray-600">专注2-7年投资周期</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧：股票列表 */}
            <div className="lg:col-span-8">
              <StockList isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      {/* 免责声明 */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/60 rounded-xl p-6 backdrop-blur-sm border border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
              ⚠️ 重要提醒
            </h4>
            <div className="text-sm text-amber-700 space-y-2">
              <p>
                • 本系统为技术分析工具，仅供投资参考，不构成投资建议
              </p>
              <p>
                • 股市投资存在风险，历史表现不代表未来收益
              </p>
              <p>
                • 请根据自身风险承受能力谨慎投资，建议咨询专业投资顾问
              </p>
              <p>
                • 当前为MVP测试版本，算法仍在优化中
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}