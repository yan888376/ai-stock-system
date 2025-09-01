'use client'

export default function StrategyCards() {
  const strategies = [
    {
      name: '春天选股法',
      icon: '🌱',
      status: 'active',
      description: '识别处于春天上涨趋势的股票',
      metrics: {
        accuracy: '75%',
        period: '2-7年',
        risk: '低'
      },
      features: ['四季识别', 'M底形态', '长期持有'],
      bgColor: 'from-green-500 to-emerald-600',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50'
    },
    {
      name: '芝麻开门法',
      icon: '🌰', 
      status: 'coming_soon',
      description: '捕捉爆发性上涨机会',
      metrics: {
        accuracy: '70%',
        period: '1-6月',
        risk: '中'
      },
      features: ['芝麻地识别', '开门信号', '爆发捕捉'],
      bgColor: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-700',
      bgLight: 'bg-orange-50'
    },
    {
      name: '短线选股法',
      icon: '⚡',
      status: 'coming_soon', 
      description: '快速短线交易机会',
      metrics: {
        accuracy: '65%',
        period: '1-5天',
        risk: '高'
      },
      features: ['三维融合', '高频信号', '快进快出'],
      bgColor: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-700',
      bgLight: 'bg-purple-50'
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">选股策略</h3>
      
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg border transition-all duration-200 ${
              strategy.status === 'active'
                ? 'border-green-200 bg-green-50/50 hover:bg-green-50' 
                : 'border-gray-200 bg-gray-50/50'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{strategy.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{strategy.name}</h4>
                    <p className="text-xs text-gray-600">{strategy.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1">
                  {strategy.status === 'active' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      运行中
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      即将上线
                    </span>
                  )}
                </div>
              </div>

              {/* 策略指标 */}
              <div className="flex items-center space-x-4 mb-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">准确率:</span>
                  <span className="font-medium text-gray-700">{strategy.metrics.accuracy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">周期:</span>
                  <span className="font-medium text-gray-700">{strategy.metrics.period}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">风险:</span>
                  <span className={`font-medium ${
                    strategy.metrics.risk === '低' ? 'text-green-600' :
                    strategy.metrics.risk === '中' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {strategy.metrics.risk}
                  </span>
                </div>
              </div>

              {/* 特性标签 */}
              <div className="flex flex-wrap gap-1">
                {strategy.features.map((feature, fIndex) => (
                  <span
                    key={fIndex}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strategy.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* 活跃状态指示器 */}
              {strategy.status === 'active' && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 flex items-start space-x-2">
          <span className="text-blue-500 mt-0.5">💡</span>
          <span>
            当前专注于<strong>春天选股法</strong>的完善和验证，其他策略将在后续版本中逐步开放。
          </span>
        </p>
      </div>
    </div>
  )
}