<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{ active: string }>()
const router = useRouter()

const tabs = [
  { key: 'home', label: '首页', icon: '🏠', path: '/home' },
  { key: 'plan', label: '计划', icon: '📋', path: '/plan' },
  { key: 'study', label: '学习', icon: '📚', path: '/english' },
  { key: 'profile', label: '我的', icon: '👤', path: '/profile' }
]

function switchTab(path: string) {
  router.push(path)
}
</script>

<template>
  <!-- 移动端底部导航 -->
  <div class="tab-bar mobile-only">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-item"
      :class="{ active: active === tab.key }"
      @click="switchTab(tab.path)"
    >
      <span class="tab-icon">{{ tab.icon }}</span>
      <span class="tab-label">{{ tab.label }}</span>
    </div>
  </div>

  <!-- 桌面端左侧边栏 -->
  <div class="sidebar desktop-only">
    <div class="sidebar-header">
      <div class="logo">📚</div>
      <div class="app-name">学霸养成计划</div>
    </div>
    <nav class="sidebar-nav">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="nav-item"
        :class="{ active: active === tab.key }"
        @click="switchTab(tab.path)"
      >
        <span class="nav-icon">{{ tab.icon }}</span>
        <span class="nav-label">{{ tab.label }}</span>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="user-avatar">👤</div>
      <div class="user-name">学习者</div>
    </div>
  </div>
</template>

<style scoped>
/* ========== 移动端底部导航 ========== */
.mobile-only {
  display: flex;
}

.desktop-only {
  display: none;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 4px 12px;
}

.tab-item.active .tab-label {
  color: #4A90E2;
}

.tab-icon {
  font-size: 20px;
}

.tab-label {
  font-size: 11px;
  color: #999;
}

/* ========== 桌面端左侧边栏 ========== */
@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: flex;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 220px;
    background: #fff;
    border-right: 1px solid #e8e8e8;
    flex-direction: column;
    z-index: 100;
    padding: 20px 0;
  }

  .sidebar-header {
    padding: 0 20px 24px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    font-size: 32px;
  }

  .app-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .sidebar-nav {
    flex: 1;
    padding: 0 12px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 4px;
    transition: all 0.2s;
  }

  .nav-item:hover {
    background: #f5f5f5;
  }

  .nav-item.active {
    background: #E8F1FC;
    color: #4A90E2;
  }

  .nav-item.active .nav-label {
    color: #4A90E2;
    font-weight: bold;
  }

  .nav-icon {
    font-size: 20px;
  }

  .nav-label {
    font-size: 14px;
    color: #666;
  }

  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    font-size: 28px;
  }

  .user-name {
    font-size: 14px;
    color: #666;
  }
}
</style>
