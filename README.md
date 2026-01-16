# affui - 弥散渐变美学视觉实验

affui 是一个基于弥散渐变美学的视觉实验项目，旨在探索极简主义与现代美学的完美融合，利用弥散渐变效果创造具有“呼吸感”和“交互感”的现代 UI 体验。

## 核心特性

- **弥散背景 (Diffused Background)**: 动态生成的柔和模糊背景，具有呼吸律动的动画效果。
    - 随机运动的色彩气泡 (Blobs)
    - 高斯模糊与多层混合模式
    - 响应式自适应布局
- **玻璃拟态 (Glassmorphism)**: 磨砂玻璃质感的组件设计，增强视觉层次感。
- **灵动交互**: 精心设计的微动画与悬停反馈。
- **高度定制**: 支持自定义色彩、模糊度及动态效果。

## 技术栈

- **框架**: [TanStack Start](https://tanstack.com/start) (React + TanStack Router)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **组件库**: 基于 [Shadcn UI](https://ui.shadcn.com/) 规范

## 快速开始

### 运行开发环境

```bash
pnpm install
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 项目结构

- `src/components/`: 核心视觉组件
    - `DiffusedBackground.tsx`: 弥散渐变背景组件
    - `GlassCard.tsx`: 玻璃拟态卡片组件
- `src/routes/`: 页面路由
    - `index.tsx`: 艺术化 Landing Page
    - `gradient.tsx`: 弥散渐变生成器工具

## 贡献

欢迎提交 Issue 或 Pull Request 来完善这个美学实验。

## 许可证

MIT
