# AI智能选股系统 MVP

基于师傅三大选股方法的AI智能选股系统MVP版本，专注于**春天选股法**的实现和验证。

## 🎯 项目概述

本项目是一个基于技术分析的智能选股系统，采用师傅的**春天选股法**核心理念：
- 🌱 识别处于"春天"上涨趋势的股票
- 📊 通过M底/W顶形态分析寻找最佳买点
- 💎 专注2-7年长期投资策略
- 🤖 AI算法辅助投资决策

## 🚀 技术栈

### 前端
- **Next.js 14** - React全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 现代化样式
- **Heroicons** - 图标库

### 后端 
- **Next.js API Routes** - 服务端API
- **免费股票数据API** - 新浪财经接口
- **Vercel部署** - 免费托管平台

### 数据源（免费）
- 新浪财经API - 实时股票数据
- 腾讯财经API - 备用数据源

## 📁 项目结构

```
ai-stock-mvp/
├── app/
│   ├── components/          # React组件
│   │   ├── StockList.tsx   # 股票列表
│   │   ├── MarketOverview.tsx # 市场概览
│   │   └── StrategyCards.tsx  # 策略卡片
│   ├── api/                # API路由
│   │   ├── stocks/         # 股票数据API
│   │   └── market/         # 市场数据API
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 布局组件
│   └── page.tsx           # 首页
├── public/                 # 静态资源
├── package.json           # 依赖配置
├── tailwind.config.js     # Tailwind配置
├── next.config.js         # Next.js配置
├── vercel.json            # Vercel部署配置
└── README.md              # 项目文档
```

## 🛠️ 本地开发

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd ai-stock-mvp
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **环境配置**
```bash
cp .env.local.example .env.local
# 编辑 .env.local 填入必要的配置
```

4. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:3000`

## 🌟 核心功能

### ✅ 已实现功能

1. **春天选股分析**
   - 股票四季状态识别
   - M底W顶形态分析
   - 春天股票评分算法
   - 买卖建议生成

2. **实时数据展示**
   - 股票实时价格
   - 涨跌幅显示
   - 成交量分析
   - 市场指数概览

3. **用户界面**
   - 响应式设计
   - 股票列表展示
   - 市场环境分析
   - 策略状态监控

4. **智能推荐**
   - AI评分系统
   - 投资建议等级
   - 风险评估
   - 目标价计算

### 🚧 开发中功能

1. **芝麻开门法** - 计划下个版本
2. **短线选股法** - 计划后续版本
3. **用户系统** - 个性化设置
4. **消息提醒** - 信号推送通知

## 📊 春天选股法算法

### 核心逻辑

1. **季节识别算法**
   ```typescript
   function analyzeSpringConditions(stock: StockData): boolean {
     // 价格趋势分析
     const trendCondition = stock.changePercent > -5
     
     // 成交量确认
     const volumeCondition = stock.volume > threshold
     
     // 技术形态识别
     const patternCondition = detectMBottomPattern(stock)
     
     return trendCondition && volumeCondition && patternCondition
   }
   ```

2. **评分系统**
   - 基础分：5.0分
   - 价格表现：+0-2.0分
   - 成交量：+0-1.0分  
   - 技术形态：+0-2.0分
   - 最高分：10.0分

3. **推荐等级**
   - 8.5-10.0分：强烈买入
   - 7.0-8.4分：买入
   - 5.0-6.9分：持有
   - 0-4.9分：卖出

## 🚀 部署说明

### Vercel部署（推荐）

1. **连接GitHub**
   - Fork本项目到你的GitHub
   - 在Vercel中导入项目

2. **环境变量设置**
   ```
   NEXT_PUBLIC_APP_NAME=AI智能选股系统
   NODE_ENV=production
   ```

3. **自动部署**
   - 推送代码到main分支自动部署
   - 访问分配的域名查看应用

### 本地构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 📈 性能指标

### 预期表现
- **春天识别准确率**：70-80%
- **长期投资胜率**：60-70%
- **年化收益目标**：15-25%
- **最大回撤控制**：< 20%

### 系统性能
- **页面加载时间**：< 2秒
- **API响应时间**：< 1秒
- **数据更新频率**：每日更新
- **支持并发用户**：1000+

## ⚠️ 免责声明

1. **投资风险提示**
   - 本系统仅供技术分析参考
   - 不构成具体投资建议
   - 股市投资存在风险，请谨慎决策

2. **数据准确性**
   - 数据来源于第三方API
   - 可能存在延迟或偏差
   - 建议与官方数据核实

3. **系统限制**
   - 当前为MVP测试版本
   - 功能持续优化中
   - 建议小资金验证效果

## 🔧 开发计划

### Version 1.1 (下个月)
- [ ] 添加历史数据分析
- [ ] 优化春天识别算法
- [ ] 增加更多技术指标
- [ ] 改进用户界面

### Version 1.2 (后续)
- [ ] 芝麻开门法实现
- [ ] 用户账号系统
- [ ] 消息推送功能
- [ ] 移动端适配优化

### Version 2.0 (长期)
- [ ] 短线选股法
- [ ] 高级图表分析
- [ ] 投资组合管理
- [ ] 社区功能

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📧 联系方式

如有问题或建议，请通过以下方式联系：
- 提交GitHub Issue
- 项目讨论区

---

**© 2025 AI智能选股系统 - 让投资更智能，让收益更稳定**