/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // API路由配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3000/api/:path*'
          : '/api/:path*'
      }
    ]
  },
  
  // 环境变量配置
  env: {
    CUSTOM_KEY: 'my-value',
  },
  
  // 图片优化配置
  images: {
    domains: ['localhost'],
    unoptimized: true // Vercel免费版使用
  },
  
  // 实验性功能
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig