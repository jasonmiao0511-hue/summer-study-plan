<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TabBar from '../../components/common/TabBar.vue'

const router = useRouter()
const userStore = useUserStore()

const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })

const tasks = ref([
  { subject: 'english', label: '英语', status: 'completed', detail: '10词 · 35分钟', range: 'ability~alive' },
  { subject: 'chinese', label: '语文', status: 'progress', detail: '《观沧海》', progress: '挖空练习 2/3' },
  { subject: 'math', label: '数学', status: 'pending', detail: '有理数减法' }
])

const allCompleted = computed(() => tasks.value.every(t => t.status === 'completed'))

const weekData = [
  { day: '一', minutes: 45 },
  { day: '二', minutes: 60 },
  { day: '三', minutes: 30 },
  { day: '四', minutes: 0 },
  { day: '五', minutes: 90 },
  { day: '六', minutes: 0 },
  { day: '日', minutes: 0 }
]

const weekTotal = weekData.reduce((sum, d) => sum + d.minutes, 0)

function goTask(task: any) {
  router.push(`/${task.subject}`)
}

function shareAchievement() {
  alert('分享功能开发中')
}
</script>

<template>
  <div class="home-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <!-- 顶部统计 -->
      <div class="header-stats">
        <div class="streak">已连续打卡 {{ userStore.streakDays }} 天 🔥</div>
        <div class="rate">本周完成率 85%</div>
      </div>

      <!-- 桌面端双栏布局容器 -->
      <div class="desktop-layout">
        <!-- 左侧：今日任务 -->
        <div class="left-column">
          <div class="today-section">
            <div class="today-header">
              <span>📅 {{ today }}</span>
              <span class="task-count">
                {{ tasks.filter(t => t.status === 'completed').length }}/{{ tasks.length }}
                {{ allCompleted ? '全部完成' : '进行中' }}
              </span>
            </div>

            <div class="task-list">
              <div
                v-for="task in tasks"
                :key="task.subject"
                class="task-card"
                :class="task.status"
                @click="goTask(task)"
              >
                <div class="task-main">
                  <span class="status-icon">
                    {{ task.status === 'completed' ? '✅' : task.status === 'progress' ? '⏳' : '🔘' }}
                  </span>
                  <div class="task-info">
                    <div class="task-title">{{ task.label }} {{ task.status === 'completed' ? '已完成' : task.status === 'progress' ? '进行中' : '待开始' }}</div>
                    <div class="task-detail">{{ task.detail }}</div>
                    <div v-if="task.range" class="task-range">{{ task.range }}</div>
                    <div v-if="task.progress" class="task-progress">{{ task.progress }}</div>
                  </div>
                </div>
                <button v-if="task.status !== 'completed'" class="continue-btn">
                  {{ task.status === 'progress' ? '继续' : '开始' }}
                </button>
              </div>
            </div>

            <!-- 全部完成庆祝 -->
            <div v-if="allCompleted" class="celebration">
              <div class="celebration-icon">🎊 🎊 🎊</div>
              <p>今日任务全部完成！</p>
              <p class="badge">获得勋章：全勤小达人</p>
              <button class="share-btn" @click="shareAchievement">分享今日成就</button>
            </div>
          </div>
        </div>

        <!-- 右侧：统计图表 -->
        <div class="right-column">
          <!-- 本周时长 -->
          <div class="week-section">
            <p class="section-title">📊 本周学习时长</p>
            <div class="week-chart">
              <div v-for="d in weekData" :key="d.day" class="bar-item">
                <div class="bar" :style="{ height: d.minutes > 0 ? (d.minutes / 120 * 80) + 'px' : '4px', background: d.minutes > 0 ? '#4A90E2' : '#e0e0e0' }"></div>
                <span class="bar-day">{{ d.day }}</span>
                <span class="bar-val">{{ d.minutes }}</span>
              </div>
            </div>
            <p class="week-total">本周总计：{{ weekTotal }}分钟</p>
          </div>

          <!-- 科目统计（桌面端新增） -->
          <div class="subject-stats">
            <p class="section-title">📈 科目分布</p>
            <div class="stat-items">
              <div class="stat-item">
                <div class="stat-icon">🇬🇧</div>
                <div class="stat-info">
                  <div class="stat-label">英语</div>
                  <div class="stat-bar"><div class="stat-fill" style="width: 40%; background: #4A90E2;"></div></div>
                </div>
                <div class="stat-val">40%</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🇨🇳</div>
                <div class="stat-info">
                  <div class="stat-label">语文</div>
                  <div class="stat-bar"><div class="stat-fill" style="width: 35%; background: #52C41A;"></div></div>
                </div>
                <div class="stat-val">35%</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🔢</div>
                <div class="stat-info">
                  <div class="stat-label">数学</div>
                  <div class="stat-bar"><div class="stat-fill" style="width: 25%; background: #F5A623;"></div></div>
                </div>
                <div class="stat-val">25%</div>
              </div>
            </div>
          </div>

          <!-- 快速入口（桌面端新增） -->
          <div class="quick-actions">
            <p class="section-title">⚡ 快速入口</p>
            <div class="action-grid">
              <div class="action-item" @click="router.push('/english')">
                <div class="action-icon">📝</div>
                <div class="action-label">单词练习</div>
              </div>
              <div class="action-item" @click="router.push('/chinese')">
                <div class="action-icon">📖</div>
                <div class="action-label">古诗背诵</div>
              </div>
              <div class="action-item" @click="router.push('/math')">
                <div class="action-icon">🧮</div>
                <div class="action-label">数学任务</div>
              </div>
              <div class="action-item" @click="router.push('/plan')">
                <div class="action-icon">📅</div>
                <div class="action-label">学习计划</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TabBar active="home" />
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 70px;
}

.header-stats {
  background: linear-gradient(135deg, #4A90E2 0%, #6BA5E7 100%);
  color: #fff;
  padding: 20px 16px;
  text-align: center;
}

.streak {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.rate {
  font-size: 14px;
  opacity: 0.9;
}

.today-section {
  margin: 12px 16px;
}

.today-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.task-count {
  color: #4A90E2;
  font-weight: bold;
}

.task-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.task-card.completed {
  opacity: 0.7;
}

.task-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  font-size: 20px;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.task-detail {
  font-size: 12px;
  color: #666;
}

.task-range, .task-progress {
  font-size: 12px;
  color: #999;
}

.continue-btn {
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}

.celebration {
  text-align: center;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  margin-top: 12px;
}

.celebration-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.celebration p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.badge {
  font-size: 14px;
  color: #F5A623 !important;
}

.share-btn {
  margin-top: 12px;
  background: #F5A623;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  cursor: pointer;
}

.week-section {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 8px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.week-chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 80px;
  margin-bottom: 8px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bar {
  width: 20px;
  border-radius: 2px;
  transition: height 0.3s;
}

.bar-day {
  font-size: 12px;
  color: #666;
}

.bar-val {
  font-size: 11px;
  color: #999;
}

.week-total {
  font-size: 12px;
  color: #666;
  text-align: center;
}

/* 桌面端隐藏的元素 */
.desktop-only {
  display: none;
}

/* ========== 桌面端响应式布局 ========== */
@media (min-width: 768px) {
  .home-page {
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
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .today-section {
    margin: 0;
  }

  .week-section {
    margin: 0;
  }

  .header-stats {
    border-radius: 0 0 12px 12px;
    margin: 0 16px;
    padding: 24px;
  }

  .streak {
    font-size: 24px;
  }

  .rate {
    font-size: 16px;
  }

  /* 桌面端新增模块 */
  .subject-stats {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
  }

  .stat-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .stat-icon {
    font-size: 20px;
  }

  .stat-info {
    flex: 1;
  }

  .stat-label {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
  }

  .stat-bar {
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .stat-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s;
  }

  .stat-val {
    font-size: 13px;
    color: #999;
    min-width: 36px;
    text-align: right;
  }

  .quick-actions {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
  }

  .action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 16px 8px;
    background: #f8f9fa;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-item:hover {
    background: #E8F1FC;
  }

  .action-icon {
    font-size: 24px;
  }

  .action-label {
    font-size: 12px;
    color: #666;
  }
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>