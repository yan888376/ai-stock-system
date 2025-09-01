import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AI智能选股系统 - 春天选股法',
  description: '基于师傅三大选股方法的AI智能选股系统，专注春天选股法，为您发现潜力股票',
  keywords: '股票选股,AI选股,春天选股法,芝麻开门法,短线选股,技术分析',
  authors: [{ name: 'AI智能选股团队' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AI智能选股系统',
    description: '基于师傅三大选股方法的智能投资决策平台',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col min-h-screen">
          {/* 导航栏 */}
          <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      智能选股系统
                    </h1>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">MVP测试版</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </nav>

          {/* 主内容区 */}
          <main className="flex-1">
            {children}
          </main>

          {/* 页脚 */}
          <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  © 2025 AI智能选股系统 - 基于师傅三大选股方法
                </p>
                <p className="text-xs text-gray-500">
                  ⚠️ 投资有风险，决策需谨慎。本系统仅提供技术分析参考，不构成投资建议。
                </p>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}