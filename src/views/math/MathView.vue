<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMathStore } from '../../stores/math'

const router = useRouter()
const store = useMathStore()

const task = computed(() => store.todayTask)

function startLearning() {
  router.push('/math-detail')
}

function goNetwork() {
  router.push('/math-network')
}
</script>

<template>
  <div class="math-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="back" @click="$router.push('/home')">←</span>
        <span class="title">数学学习</span>
        <span></span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：任务内容 -->
        <div class="left-column">
          <div class="task-header">
            <p class="task-day">Day {{ store.currentDay }} · {{ task?.title }}</p>
            <p class="task-unit">{{ task?.unit }} · 第{{ store.currentDay }}天</p>
          </div>

          <div class="task-card">
            <p class="card-title">📋 今日任务</p>
            <div class="task-info">
              <p class="info-label">任务名称：</p>
              <p class="info-value">{{ task?.title }}</p>
              <p class="info-label">预计用时：{{ task?.estimatedMinutes }}分钟</p>
              <p class="info-label">难度：{{ '⭐'.repeat(task?.difficulty || 1) }}</p>
            </div>
          </div>

          <div class="points-card">
            <p class="card-title">📚 知识要点</p>
            <ul>
              <li v-for="(point, index) in task?.keyPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="examples-card">
            <p class="card-title">💡 示例</p>
            <div
              v-for="(ex, index) in task?.examples"
              :key="index"
              class="example"
            >
              <p class="ex-problem">例：{{ ex.problem }}</p>
              <p class="ex-solution">= {{ ex.solution }}</p>
            </div>
          </div>

          <div class="warning-card">
            <p class="card-title">⚠️ 易错提醒</p>
            <ul>
              <li v-for="(w, index) in task?.warnings" :key="index">
                {{ w }}
              </li>
            </ul>
          </div>

          <div class="mnemonic-card">
            <p class="card-title">💡 记忆口诀</p>
            <p v-for="(m, index) in task?.mnemonics" :key="index" class="mnemonic">
              {{ m }}
            </p>
          </div>

          <div class="btn-group">
            <button class="btn-start" @click="startLearning">开始学习</button>
            <button class="btn-network" @click="goNetwork">查看知识网络</button>
          </div>
        </div>

        <!-- 右侧：统计 + 进度（桌面端） -->
        <div class="right-column">
          <div class="stats-section desktop-stats">
            <p class="section-title">📊 学习统计</p>
            <div class="stat-grid">
              <div class="stat-box">
                <div class="stat-num">{{ store.completedTasks.length }}</div>
                <div class="stat-label">已完成</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.tasks.length - store.completedTasks.length }}</div>
                <div class="stat-label">待完成</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.averageRating.toFixed(1) }}</div>
                <div class="stat-label">平均评分</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ Math.round(store.completedTasks.length / store.tasks.length * 100) || 0 }}%</div>
                <div class="stat-label">完成率</div>
              </div>
            </div>
          </div>

          <!-- 最近完成（桌面端） -->
          <div class="recent-section desktop-stats">
            <p class="section-title">📝 最近完成</p>
            <div class="recent-list">
              <div v-for="i in 3" :key="i" class="recent-item">
                <div class="recent-title">有理数加减法 · Day {{ i }}</div>
                <div class="recent-meta">⭐⭐⭐⭐⭐ · 2天前</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.math-page {
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

.task-header {
  background: linear-gradient(135deg, #52C41A 0%, #73d13d 100%);
  color: #fff;
  padding: 20px 16px;
}

.task-day {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.task-unit {
  font-size: 13px;
  opacity: 0.9;
}

.task-card, .points-card, .examples-card, .warning-card, .mnemonic-card {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 13px;
  color: #666;
}

.info-value {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.points-card ul, .warning-card ul {
  list-style: none;
  padding: 0;
}

.points-card li, .warning-card li {
  font-size: 14px;
  color: #333;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}

.example {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.ex-problem {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.ex-solution {
  font-size: 14px;
  color: #4A90E2;
  font-weight: bold;
}

.mnemonic {
  font-size: 14px;
  color: #F5A623;
  background: #fff8e6;
  padding: 10px;
  border-radius: 6px;
}

.btn-start {
  width: calc(100% - 32px);
  margin: 16px;
  height: 48px;
  background: #52C41A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-network {
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  height: 44px;
  background: #fff;
  color: #4A90E2;
  border: 1px solid #4A90E2;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.desktop-only {
  display: none;
}

.desktop-stats {
  display: none;
}

/* ========== 桌面端响应式 ========== */
@media (min-width: 768px) {
  .math-page {
    display: flex;
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

  .task-header {
    border-radius: 8px;
    margin: 0 0 16px;
  }

  .task-card, .points-card, .examples-card, .warning-card, .mnemonic-card {
    margin: 0 0 16px;
  }

  .btn-group {
    display: flex;
    gap: 12px;
  }

  .btn-start, .btn-network {
    flex: 1;
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
    color: #52C41A;
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

  .recent-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .recent-item {
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .recent-title {
    font-size: 13px;
    color: #333;
    margin-bottom: 4px;
  }

  .recent-meta {
    font-size: 11px;
    color: #999;
  }
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>