<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)
const progress = computed(() => store.currentProgress)

const steps = [
  { key: 'read', label: '原文诵读', icon: '📖' },
  { key: 'guide', label: '要点讲解', icon: '🎯' },
  { key: 'fill', label: '挖空背诵', icon: '✍️' },
  { key: 'write', label: '默写检测', icon: '📝' }
]

function goStep(step: string) {
  router.push(`/chinese-${step}`)
}

function continueLearning() {
  if (!progress.value?.steps.read) {
    router.push('/chinese-read')
  } else if (!progress.value?.steps.guide) {
    router.push('/chinese-guide')
  } else if (!progress.value?.steps.fill) {
    router.push('/chinese-fill')
  } else {
    router.push('/chinese-write')
  }
}
</script>

<template>
  <div class="chinese-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="back" @click="$router.push('/home')">←</span>
        <span class="title">语文学习</span>
        <span></span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：学习流程 -->
        <div class="left-column">
          <div class="article-header">
            <p class="today-label">今日背诵：{{ article?.title }}</p>
            <p class="author">{{ article?.author }} · {{ article?.dynasty }}</p>
            <p class="progress-text">
              进度：{{ steps.filter(s => progress?.steps[s.key as keyof typeof progress.steps]).length }}/4
            </p>
          </div>

          <div class="flow-card">
            <p class="flow-title">📖 学习流程</p>
            <div class="flow-steps">
              <div
                v-for="(step, index) in steps"
                :key="step.key"
                class="flow-step"
                :class="{ completed: progress?.steps[step.key as keyof typeof progress.steps] }"
              >
                <span class="step-num">{{ index + 1 }}</span>
                <span class="step-icon">{{ step.icon }}</span>
                <span class="step-label">{{ step.label }}</span>
                <span class="step-status">
                  {{ progress?.steps[step.key as keyof typeof progress.steps] ? '✅' : index === steps.findIndex(s => !progress?.steps[s.key as keyof typeof progress.steps]) ? '⏳' : '🔘' }}
                </span>
              </div>
            </div>
          </div>

          <button class="btn-continue" @click="continueLearning">继续学习</button>
        </div>

        <!-- 右侧：快捷入口 + 统计 -->
        <div class="right-column">
          <div class="quick-section">
            <p class="quick-title">快捷入口</p>
            <div class="quick-grid">
              <div
                v-for="step in steps"
                :key="step.key"
                class="quick-card"
                @click="goStep(step.key)"
              >
                <span class="quick-icon">{{ step.icon }}</span>
                <span class="quick-label">{{ step.label }}</span>
              </div>
            </div>
          </div>

          <!-- 桌面端统计 -->
          <div class="stats-section desktop-stats">
            <p class="section-title">📊 背诵统计</p>
            <div class="stat-grid">
              <div class="stat-box">
                <div class="stat-num">{{ store.completedArticles.length }}</div>
                <div class="stat-label">已完成</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.articles.length - store.completedArticles.length }}</div>
                <div class="stat-label">待背诵</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.totalMistakes }}</div>
                <div class="stat-label">错题数</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ Math.round(store.completedArticles.length / store.articles.length * 100) || 0 }}%</div>
                <div class="stat-label">完成率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chinese-page {
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

.article-header {
  background: linear-gradient(135deg, #F5A623 0%, #f7c158 100%);
  color: #fff;
  padding: 20px 16px;
}

.today-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.author {
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 12px;
  opacity: 0.8;
}

.flow-card {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 8px;
}

.flow-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
}

.flow-step.completed {
  opacity: 0.6;
}

.step-num {
  width: 20px;
  height: 20px;
  background: #4A90E2;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.step-icon {
  font-size: 16px;
}

.step-label {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.step-status {
  font-size: 14px;
}

.btn-continue {
  width: calc(100% - 32px);
  margin: 0 16px;
  height: 48px;
  background: #F5A623;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.quick-section {
  margin: 16px;
}

.quick-title {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.quick-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.quick-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.quick-label {
  font-size: 13px;
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
  .chinese-page {
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

  .article-header {
    border-radius: 8px;
    margin: 0 0 16px;
  }

  .flow-card {
    margin: 0 0 16px;
  }

  .btn-continue {
    width: 100%;
    margin: 0;
  }

  .quick-section {
    margin: 0;
  }

  .quick-grid {
    grid-template-columns: 1fr 1fr;
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
    color: #F5A623;
    margin-bottom: 4px;
  }

  .stat-label {
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
