<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TabBar from '../../components/common/TabBar.vue'

const router = useRouter()
const userStore = useUserStore()

const stats = computed(() => [
  { label: '已坚持', value: `${userStore.studyDays}天` },
  { label: '总时长', value: `${Math.floor(userStore.totalStudyMinutes / 60)}小时` },
  { label: '完成词', value: '150个' },
  { label: '背诗篇', value: '12篇' }
])

const menuItems = [
  { icon: '⚙️', label: '学习计划设置', path: '/plan-adjust' },
  { icon: '🔔', label: '每日提醒设置', path: '' },
  { icon: '🎨', label: '学习偏好设置', path: '' },
  { icon: '📤', label: '导出学习记录', path: '' },
  { icon: '👨‍👩‍👧', label: '绑定家长微信', path: '' },
  { icon: '❓', label: '使用指南', path: '' },
  { icon: '💬', label: '意见反馈', path: '' }
]

function goPage(path: string) {
  if (path) router.push(path)
}
</script>

<template>
  <div class="profile-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="title">个人中心</span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：用户信息 + 统计 -->
        <div class="left-column">
          <div class="user-card">
            <div class="avatar">👤</div>
            <div class="user-info">
              <p class="user-name">{{ userStore.profile.name }}</p>
              <p class="user-grade">{{ userStore.profile.grade }} · {{ userStore.profile.classType }}</p>
            </div>
          </div>

          <div class="stats-card">
            <p class="stats-title">📊 学习统计</p>
            <div class="stats-grid">
              <div v-for="stat in stats" :key="stat.label" class="stat-item">
                <p class="stat-value">{{ stat.value }}</p>
                <p class="stat-label">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：设置菜单 -->
        <div class="right-column">
          <div class="menu-section">
            <p class="menu-title">⚙️ 设置</p>
            <div class="menu-list">
              <div
                v-for="item in menuItems"
                :key="item.label"
                class="menu-item"
                @click="goPage(item.path)"
              >
                <span class="menu-icon">{{ item.icon }}</span>
                <span class="menu-label">{{ item.label }}</span>
                <span class="menu-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TabBar active="profile" />
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 70px;
}

.header {
  padding: 12px 16px;
  background: #fff;
  text-align: center;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 16px;
  background: linear-gradient(135deg, #4A90E2 0%, #6BA5E7 100%);
  color: #fff;
}

.avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.user-grade {
  font-size: 13px;
  opacity: 0.9;
}

.stats-card {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 8px;
}

.stats-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: #4A90E2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: #999;
}

.menu-section {
  margin: 0 16px;
}

.menu-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.menu-list {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
}

.menu-label {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.menu-arrow {
  font-size: 14px;
  color: #999;
}

.desktop-only {
  display: none;
}

/* ========== 桌面端响应式 ========== */
@media (min-width: 768px) {
  .profile-page {
    display: flex;
    padding-bottom: 0;
  }

  .sidebar-spacer {
    width: 220px;
    flex-shrink: 0;
  }

  .main-content {
    flex: 1;
    min-height: 100vh;
    overflow-y: auto;
  }

  .desktop-layout {
    display: flex;
    gap: 16px;
    padding: 16px;
    max-width: 1000px;
  }

  .left-column {
    flex: 1;
    min-width: 0;
  }

  .right-column {
    width: 340px;
    flex-shrink: 0;
  }

  .user-card {
    border-radius: 8px;
    margin: 0 0 16px;
  }

  .stats-card {
    margin: 0;
  }

  .menu-section {
    margin: 0;
  }
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>