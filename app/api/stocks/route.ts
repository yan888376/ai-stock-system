import { NextRequest, NextResponse } from 'next/server'

// 简化的股票数据接口
interface StockData {
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  amount: number
  lastUpdate: string
}

// 简化的分析结果接口
interface AnalysisResult {
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  pattern: string
  score: number
  recommendation: string
  targetPrice: number
  riskLevel: string
  holdingPeriod: string
  reason: string
}

// A股主要股票代码列表
const STOCK_CODES = [
  '000001', '000002', '000858', '600036', '600519', '600000', '601318',
  '000858', '002415', '300059', '002230', '601888', '600276', '600887'
]

// 模拟股票数据（用于MVP测试）
function generateMockStockData(): StockData[] {
  return STOCK_CODES.map(code => ({
    code: code,
    name: `股票${code}`,
    price: 10 + Math.random() * 100,
    change: (Math.random() - 0.5) * 10,
    changePercent: (Math.random() - 0.5) * 20,
    open: 10 + Math.random() * 100,
    high: 15 + Math.random() * 100,
    low: 5 + Math.random() * 50,
    volume: Math.floor(Math.random() * 1000000),
    amount: Math.floor(Math.random() * 100000000),
    lastUpdate: new Date().toISOString()
  }))
}

// 简化的春天选股分析
function analyzeSpringStocks(stockData: StockData[]): AnalysisResult[] {
  return stockData
    .map(stock => {
      // 简化的春天识别逻辑
      const isSpring = stock.changePercent > -5 && stock.volume > 100000
      
      if (!isSpring) return null
      
      const score = 5 + Math.random() * 5 // 5-10分
      const recommendation = score >= 8 ? '强烈买入' : score >= 6 ? '买入' : '持有'
      const targetPrice = stock.price * (1.2 + Math.random() * 0.8)
      const riskLevel = score >= 8 ? '低风险' : score >= 6 ? '中风险' : '高风险'
      
      const patterns = ['M底', '上涨趋势', '突破整理', '强势回调']
      const pattern = patterns[Math.floor(Math.random() * patterns.length)]
      
      return {
        code: stock.code,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        pattern: pattern,
        score: Math.round(score * 10) / 10,
        recommendation: recommendation,
        targetPrice: Math.round(targetPrice * 100) / 100,
        riskLevel: riskLevel,
        holdingPeriod: '2-7年',
        reason: `${pattern}形态良好，符合春天选股标准`
      }
    })
    .filter((stock): stock is AnalysisResult => stock !== null)
    .sort((a, b) => b.score - a.score)
}

// GET请求处理
export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const strategy = searchParams.get('strategy') || 'spring'
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // 生成模拟数据
    const stockData = generateMockStockData()
    
    // 根据策略分析
    let analysisResults: AnalysisResult[] = []
    
    if (strategy === 'spring') {
      analysisResults = analyzeSpringStocks(stockData)
    } else {
      // 其他策略的占位符
      analysisResults = []
    }
    
    // 限制返回数量
    const limitedResults = analysisResults.slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: {
        strategy: strategy,
        total: analysisResults.length,
        results: limitedResults,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('API错误:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '服务器内部错误',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
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