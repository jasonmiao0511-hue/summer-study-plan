<script setup lang="ts">
const achievements = [
  {
    category: '连续打卡类',
    items: [
      { icon: '🔥', label: '7天', status: 'completed' },
      { icon: '🔥', label: '30天', status: 'completed' },
      { icon: '🔥', label: '60天', status: 'locked' }
    ]
  },
  {
    category: '单科完成类',
    items: [
      { icon: '📚', label: '英语500词', status: 'completed' },
      { icon: '📖', label: '语文30篇', status: 'progress' },
      { icon: '✏️', label: '数学60天', status: 'locked' }
    ]
  },
  {
    category: '特殊成就',
    items: [
      { icon: '⭐', label: '全勤', status: 'completed' },
      { icon: '🌙', label: '夜猫', status: 'locked' },
      { icon: '🚀', label: '学霸', status: 'locked' }
    ]
  }
]

const nextBadge = {
  name: '语文背诵达人',
  progress: 12,
  total: 30
}
</script>

<template>
  <div class="achievements-page">
    <div class="header">
      <span class="back" @click="$router.push('/home')">←</span>
      <span class="title">我的成就</span>
      <span></span>
    </div>

    <div class="content">
      <div class="stats-header">
        <p class="stats-title">🏆 已获得 12 枚勋章</p>
      </div>

      <div v-for="group in achievements" :key="group.category" class="group">
        <p class="group-title">{{ group.category }}</p>
        <div class="badge-grid">
          <div
            v-for="(item, index) in group.items"
            :key="index"
            class="badge-item"
            :class="item.status"
          >
            <span class="badge-icon">{{ item.icon }}</span>
            <span class="badge-label">{{ item.label }}</span>
            <span class="badge-status">
              {{ item.status === 'completed' ? '✅' : item.status === 'progress' ? '⏳' : '🔒' }}
            </span>
          </div>
        </div>
      </div>

      <div class="next-badge">
        <p class="next-title">下一枚勋章</p>
        <div class="next-card">
          <p class="next-name">📖 {{ nextBadge.name }}</p>
          <p class="next-progress">进度：{{ nextBadge.progress }}/{{ nextBadge.total }}</p>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: (nextBadge.progress / nextBadge.total * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievements-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
}

.back {
  font-size: 20px;
  cursor: pointer;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.content {
  padding: 16px;
}

.stats-header {
  text-align: center;
  padding: 20px;
  margin-bottom: 16px;
}

.stats-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.group {
  margin-bottom: 16px;
}

.group-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.badge-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.badge-item.locked {
  opacity: 0.5;
}

.badge-icon {
  font-size: 28px;
}

.badge-label {
  font-size: 12px;
  color: #333;
}

.badge-status {
  font-size: 14px;
}

.next-badge {
  margin-top: 16px;
}

.next-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.next-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.next-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.next-progress {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4A90E2;
  border-radius: 4px;
  transition: width 0.3s;
}
</style>