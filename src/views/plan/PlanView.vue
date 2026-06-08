<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import TabBar from '../../components/common/TabBar.vue'

const router = useRouter()
const userStore = useUserStore()

const currentMonth = ref(new Date(userStore.planSettings.startDate))
const selectedDate = ref(new Date().toISOString().split('T')[0])

const monthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPadding = firstDay.getDay()
  const days: { date: number; status: string; fullDate: string }[] = []

  for (let i = 0; i < startPadding; i++) days.push({ date: 0, status: '', fullDate: '' })

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    let status = 'pending'
    if (userStore.checkinDates.includes(fullDate)) status = 'completed'
    else if (userStore.planSettings.freeDays.includes(new Date(fullDate).getDay())) status = 'free'
    days.push({ date: d, status, fullDate })
  }

  return days
})

const todayTasks = [
  { subject: '英语', status: 'completed', detail: '10词' },
  { subject: '语文', status: 'progress', detail: '《观沧海》' },
  { subject: '数学', status: 'pending', detail: '有理数减法' }
]

function prevMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

function selectDate(fullDate: string) {
  selectedDate.value = fullDate
}

function goAdjust() {
  router.push('/plan-adjust')
}
</script>

<template>
  <div class="plan-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="title">学习计划</span>
        <span class="adjust" @click="goAdjust">[调整]</span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：日历 -->
        <div class="left-column">
          <div class="calendar-card">
            <div class="calendar-header">
              <span class="arrow" @click="prevMonth">◀</span>
              <span class="month-year">{{ monthYear }}</span>
              <span class="arrow" @click="nextMonth">▶</span>
            </div>

            <div class="weekdays">
              <span v-for="d in ['日','一','二','三','四','五','六']" :key="d">{{ d }}</span>
            </div>

            <div class="days-grid">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="day-cell"
                :class="day.status"
                @click="day.fullDate && selectDate(day.fullDate)"
              >
                <span v-if="day.date > 0">{{ day.date }}</span>
              </div>
            </div>

            <div class="legend">
              <span><span class="dot completed"></span>已完成</span>
              <span><span class="dot skipped"></span>跳过</span>
              <span><span class="dot progress"></span>进行中</span>
              <span><span class="dot pending"></span>待开始</span>
              <span><span class="dot free"></span>自由日</span>
            </div>
          </div>
        </div>

        <!-- 右侧：任务详情 + 统计 -->
        <div class="right-column">
          <div class="today-tasks">
            <p class="tasks-title">{{ selectedDate }} 任务</p>
            <div class="task-list">
              <div v-for="task in todayTasks" :key="task.subject" class="task-item">
                <span class="task-status">
                  {{ task.status === 'completed' ? '✅' : task.status === 'progress' ? '⏳' : '🔘' }}
                </span>
                <span class="task-name">{{ task.subject }}：{{ task.detail }}</span>
              </div>
            </div>
          </div>

          <!-- 桌面端统计 -->
          <div class="stats-section desktop-stats">
            <p class="section-title">📊 计划概览</p>
            <div class="stat-grid">
              <div class="stat-box">
                <div class="stat-num">{{ userStore.checkinDates.length }}</div>
                <div class="stat-label">已打卡</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ userStore.streakDays }}</div>
                <div class="stat-label">连续天数</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ userStore.planSettings.freeDays.length }}</div>
                <div class="stat-label">每周休息</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ userStore.planSettings.dailyMinutes }}</div>
                <div class="stat-label">每日分钟</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TabBar active="plan" />
  </div>
</template>

<style scoped>
.plan-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 70px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.adjust {
  font-size: 14px;
  color: #4A90E2;
  cursor: pointer;
}

.calendar-card {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 8px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.arrow {
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
}

.month-year {
  font-size: 16px;
  font-weight: bold;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
}

.day-cell.completed {
  background: #4A90E2;
  color: #fff;
}

.day-cell.progress {
  background: #FAAD14;
  color: #fff;
}

.day-cell.free {
  background: #f0f0f0;
  color: #999;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  font-size: 11px;
  color: #666;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 2px;
}

.dot.completed { background: #4A90E2; }
.dot.skipped { background: #e0e0e0; }
.dot.progress { background: #FAAD14; }
.dot.pending { background: #fff; border: 1px solid #e0e0e0; }
.dot.free { background: #f0f0f0; }

.today-tasks {
  background: #fff;
  margin: 0 16px;
  padding: 16px;
  border-radius: 8px;
}

.tasks-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #333;
}

.desktop-only {
  display: none;
}

.desktop-stats {
  display: none;
}

/* ========== 桌面端响应式 ========== */
@media (min-width: 768px) {
  .plan-page {
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

  .calendar-card {
    margin: 0;
  }

  .today-tasks {
    margin: 0;
  }

  .desktop-stats {
    display: block;
    background: #fff;
    padding: 16px;
    border-radius: 8px;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-box {
    text-align: center;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .stat-num {
    font-size: 24px;
    font-weight: bold;
    color: #4A90E2;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    color: #666;
  }

  .section-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
  }
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>