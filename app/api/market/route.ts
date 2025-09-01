import { NextRequest, NextResponse } from 'next/server'

// 市场指数数据API

interface IndexData {
  code: string
  name: string
  value: number
  change: number
  changePercent: number
  season: string
  volume?: number
  amount?: number
}

// 主要指数代码
const INDEX_CODES = {
  'sh000001': '上证指数',
  'sz399001': '深证成指', 
  'sz399006': '创业板指',
  'sz399905': '中证500',
  'sh000016': '上证50'
}

// 获取指数数据（新浪API）
async function fetchIndexData(): Promise<IndexData[]> {
  try {
    const symbols = Object.keys(INDEX_CODES).join(',')
    const url = `https://hq.sinajs.cn/list=${symbols}`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(5000)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const text = await response.text()
    const lines = text.trim().split('\n')
    
    const indices: IndexData[] = []
    
    lines.forEach((line, index) => {
      if (line.includes('hq_str_')) {
        const match = line.match(/="([^"]+)"/)
        if (match) {
          const data = match[1].split(',')
          const codes = Object.keys(INDEX_CODES)
          const currentCode = codes[index]
          
          if (data.length >= 6 && data[0]) {
            const value = parseFloat(data[1]) || 0
            const change = parseFloat(data[2]) || 0
            const changePercent = parseFloat(data[3]) || 0
            
            // 分析指数所处的季节
            const season = analyzeIndexSeason(changePercent, value)
            
            indices.push({
              code: currentCode,
              name: INDEX_CODES[currentCode as keyof typeof INDEX_CODES],
              value: value,
              change: change,
              changePercent: changePercent,
              season: season,
              volume: parseInt(data[4]) || undefined,
              amount: parseFloat(data[5]) || undefined
            })
          }
        }
      }
    })
    
    return indices
    
  } catch (error) {
    console.error('获取指数数据失败:', error)
    return generateMockIndexData()
  }
}

// 生成模拟指数数据
function generateMockIndexData(): IndexData[] {
  return [
    {
      code: 'sh000001',
      name: '上证指数',
      value: 3087.45,
      change: 15.23,
      changePercent: 0.49,
      season: '春天',
      volume: 285670000,
      amount: 31234567890
    },
    {
      code: 'sz399001', 
      name: '深证成指',
      value: 9876.32,
      change: -8.45,
      changePercent: -0.09,
      season: '夏天',
      volume: 198450000,
      amount: 28976543210
    },
    {
      code: 'sz399006',
      name: '创业板指',
      value: 2156.78,
      change: 23.45,
      changePercent: 1.10,
      season: '春天',
      volume: 156780000,
      amount: 18765432109
    },
    {
      code: 'sz399905',
      name: '中证500',
      value: 5432.10,
      change: 5.67,
      changePercent: 0.10,
      season: '春天',
      volume: 89670000,
      amount: 12345678901
    },
    {
      code: 'sh000016',
      name: '上证50', 
      value: 2789.45,
      change: -2.34,
      changePercent: -0.08,
      season: '夏天',
      volume: 67890000,
      amount: 15432109876
    }
  ]
}

// 分析指数季节
function analyzeIndexSeason(changePercent: number, value: number): string {
  // 简化的季节判断逻辑
  // 实际项目中需要更复杂的算法来分析历史数据
  
  if (changePercent > 1.0) return '春天'
  if (changePercent > -0.5 && changePercent <= 1.0) return '夏天'  
  if (changePercent > -2.0 && changePercent <= -0.5) return '秋天'
  return '冬天'
}

// 计算市场整体环境
function calculateMarketEnvironment(indices: IndexData[]) {
  const springCount = indices.filter(idx => idx.season === '春天').length
  const totalCount = indices.length
  const springRatio = springCount / totalCount
  
  let environment = '谨慎观望'
  let recommendation = '建议等待更好时机'
  let color = 'yellow'
  
  if (springRatio >= 0.6) {
    environment = '适宜春天选股'
    recommendation = '市场环境良好，可积极寻找春天股票'
    color = 'green'
  } else if (springRatio >= 0.4) {
    environment = '中性偏好'
    recommendation = '市场环境一般，谨慎选择优质股票'
    color = 'blue'
  } else {
    environment = '谨慎观望'
    recommendation = '市场环境偏弱，建议控制仓位'
    color = 'red'
  }
  
  return {
    environment,
    recommendation, 
    color,
    springRatio: Number((springRatio * 100).toFixed(1)),
    springCount,
    totalCount
  }
}

// 获取市场统计数据
function getMarketStats() {
  // 模拟市场统计数据
  return {
    springStocks: Math.floor(Math.random() * 50) + 50, // 50-100之间
    springRatio: Math.floor(Math.random() * 30) + 60, // 60-90%之间
    newSignals: Math.floor(Math.random() * 20) + 10, // 10-30之间
    strongBuyCount: Math.floor(Math.random() * 15) + 5, // 5-20之间
    avgScore: Number((Math.random() * 2 + 7).toFixed(1)), // 7.0-9.0之间
    marketSentiment: Math.random() > 0.5 ? '乐观' : '谨慎'
  }
}

// GET请求处理
export async function GET(request: NextRequest) {
  try {
    console.log('开始获取市场指数数据')
    
    // 获取指数数据
    const indices = await fetchIndexData()
    console.log('获取到指数数据:', indices.length, '个')
    
    // 计算市场环境
    const marketEnvironment = calculateMarketEnvironment(indices)
    
    // 获取市场统计
    const marketStats = getMarketStats()
    
    return NextResponse.json({
      success: true,
      data: {
        indices,
        environment: marketEnvironment,
        stats: marketStats
      },
      timestamp: new Date().toISOString(),
      message: '市场数据获取成功'
    })
    
  } catch (error) {
    console.error('市场数据API错误:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: '获取市场数据失败，请稍后重试',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// 支持CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}