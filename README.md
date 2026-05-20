# CodeMeet 实时视频面试协作平台

面向技术面试场景的实时协作平台，支持视频通话、在线代码编辑与远程执行，解决面试会话加入时序与音视频稳定性问题。

## 技术栈

- **框架**: React 19 (Vite) + Node.js (Express)
- **语言**: TypeScript / JavaScript
- **数据库**: MongoDB + Mongoose
- **认证**: Clerk (OAuth / 邮箱登录)
- **状态管理**: TanStack Query + Stream SDK
- **UI**: Tailwind CSS + DaisyUI + react-resizable-panels
- **实时通信**: Stream SDK (Video Call + Chat Channel)
- **代码执行**: Monaco Editor + Judge0 / Piston API
- **异步流程**: Inngest (Webhook 同步与后台任务)

## 功能亮点

### 1. 面试会话加入时序优化

- **原子化加入逻辑**: Dashboard「Join」由前端直接跳转改为先调用后端 API 登记 `participant` 状态并同步至 Stream 频道，通过 `findOneAndUpdate` 保证原子更新。
- **一致性保证**: 在 Stream 同步失败时执行数据库回滚，确保数据库与频道状态一致，修复了参与者无限 Loading 的问题，Join 成功率稳定至 100%。

### 2. Stream 实时通信稳定性

- **生命周期管理**: 封装 `useStreamClient` 统一管理视频与聊天生命周期，解决 React StrictMode 下重复初始化导致的设备占用问题。
- **重试机制**: 实现带指数退避的初始化重试逻辑，消除 TDZ 初始化错误，提升连接稳定性。

### 3. 异步流程解耦

- **模块独立化**: 将视频通话与聊天模块拆分为独立链路，视频功能优先初始化；聊天模块异步加载并支持失败降级，避免非核心功能阻塞首帧渲染。

### 4. 服务端认证与同步

- **用户同步**: 基于 Inngest 监听 Clerk Webhook，异步将用户信息同步至 MongoDB 与 Stream 平台。
- **安全兜底**: `protectRoute` 中间件在 Webhook 延迟场景下使用 Clerk API 进行兜底 upsert，确保鉴权稳定性。

### 5. 工程化面试体验

- **编辑器集成**: 集成 Monaco Editor 支持多语言代码编辑，对接远程执行 API 实时返回运行结果。
- **实时同步**: 使用 TanStack Query 管理会话缓存，结合 Stream 事件实时感知 Host 结束会话等状态变更。

## 开发指南

### 环境要求

- Node.js v20+
- MongoDB
- npm / pnpm

### 安装

```bash
# 安装根目录依赖
npm install

# 分别安装前后端依赖
cd backend && npm install
cd ../frontend && npm install
```

### 配置

在 `backend` 目录下创建 `.env`：

```env
PORT=5000
DB_URL="mongodb://localhost:27017/codemeet"
NODE_ENV=development
CLIENT_URL="http://localhost:5173"

# Clerk
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Stream
STREAM_API_KEY="your_stream_api_key"
STREAM_API_SECRET="your_stream_api_secret"

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"
```

在 `frontend` 目录下创建 `.env`：

```env
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
VITE_STREAM_API_KEY="your_stream_api_key"
```

### 运行

```bash
# 开发模式 (分别在两个终端运行)
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# 生产模式构建
npm run build
npm start
```

### 脚本

```bash
# 健康检查与性能指标测量
cd backend && node scripts/measure-metrics.mjs

# 数据库管理 (如果使用 MongoDB Compass 或其他工具)
```

## 项目结构

```text
├── backend/                # 服务端代码
│   ├── src/
│   │   ├── controllers/    # 业务逻辑控制器
│   │   ├── lib/            # 第三方 SDK 配置 (DB, Stream, Inngest)
│   │   ├── middleware/     # 路由中间件 (Auth, Protect)
│   │   ├── models/         # Mongoose 模型
│   │   ├── routes/         # API 路由
│   │   └── server.js       # 入口文件
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── components/     # UI 组件
│   │   ├── hooks/          # 自定义 Hooks (useStreamClient, useSessions)
│   │   ├── lib/            # 工具类 (Axios, Stream, Piston)
│   │   ├── pages/          # 路由页面
│   │   └── App.jsx         # 主组件
├── docs/                   # 项目文档与 E2E 日志
└── package.json            # 项目配置
```
