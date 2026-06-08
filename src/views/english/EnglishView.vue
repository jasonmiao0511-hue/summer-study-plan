<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEnglishStore } from '../../stores/english'

const router = useRouter()
const store = useEnglishStore()

const currentIndex = ref(0)
const currentWord = ref(store.todayWords[0])

const modes = [
  { key: 'image', label: '🖼️ 图片选义', desc: '看图选择正确释义', tag: '适合：初识单词' },
  { key: 'meaning', label: '📝 选义模式', desc: '看单词选释义', tag: '适合：巩固记忆' },
  { key: 'listen', label: '🎧 听音选词', desc: '听发音选择单词', tag: '适合：听力训练' },
  { key: 'spell', label: '✏️ 拼写填空', desc: '看释义拼写单词', tag: '适合：深度掌握' }
]

function playAudio() {
  const utterance = new SpeechSynthesisUtterance(currentWord.value.word)
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}

function markStatus(status: 'mastered' | 'learning' | 'forgotten') {
  const wordId = (store.currentDay - 1) * store.wordsPerDay + currentIndex.value
  store.markWord(wordId, status)
  if (currentIndex.value < store.todayWords.length - 1) {
    currentIndex.value++
    currentWord.value = store.todayWords[currentIndex.value]
  } else {
    router.push('/english-report')
  }
}

function goPractice() {
  router.push('/english-practice')
}
</script>

<template>
  <div class="english-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="back" @click="$router.push('/home')">←</span>
        <span class="title">英语学习</span>
        <span></span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：单词学习 -->
        <div class="left-column">
          <div class="progress">
            Day {{ store.currentDay }} · {{ store.wordsPerDay }}个单词
            <br />
            进度：{{ currentIndex + 1 }}/{{ store.todayWords.length }}
          </div>

          <!-- 单词卡片 -->
          <div class="word-card">
            <div class="image-area">
              <div class="image-placeholder">{{ currentWord.imageKeyword }}</div>
            </div>
            <div class="word-text">{{ currentWord.word }}</div>
            <div class="phonetic" @click="playAudio">
              {{ currentWord.phonetic }} 🔊
            </div>
            <div class="meaning">{{ currentWord.meaning }}</div>
            <div class="example">"{{ currentWord.example }}"</div>
            <div class="collocations">
              搭配：{{ currentWord.collocations.join(' / ') }}
            </div>
            <div class="memory-tip">
              💡 记忆法：{{ currentWord.memoryTip }}
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="actions">
            <button class="btn-forgot" @click="markStatus('forgotten')">忘记</button>
            <button class="btn-vague" @click="markStatus('learning')">模糊</button>
            <button class="btn-known" @click="markStatus('mastered')">认识</button>
          </div>
        </div>

        <!-- 右侧：练习模式 + 统计 -->
        <div class="right-column">
          <div class="practice-section">
            <p class="section-title">练习模式</p>
            <div class="mode-grid">
              <div
                v-for="mode in modes"
                :key="mode.key"
                class="mode-card"
                @click="goPractice"
              >
                <div class="mode-label">{{ mode.label }}</div>
                <div class="mode-desc">{{ mode.desc }}</div>
                <div class="mode-tag">{{ mode.tag }}</div>
              </div>
            </div>
          </div>

          <!-- 学习统计（桌面端） -->
          <div class="stats-section desktop-stats">
            <p class="section-title">📊 学习统计</p>
            <div class="stat-grid">
              <div class="stat-box">
                <div class="stat-num">{{ store.masteredCount }}</div>
                <div class="stat-label">已掌握</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.learningCount }}</div>
                <div class="stat-label">学习中</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ store.todayWords.length }}</div>
                <div class="stat-label">今日任务</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">{{ Math.round(store.masteredCount / (store.masteredCount + store.learningCount || 1) * 100) }}%</div>
                <div class="stat-label">掌握率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.english-page {
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

.progress {
  text-align: center;
  padding: 12px;
  font-size: 14px;
  color: #666;
}

.word-card {
  background: #fff;
  margin: 0 16px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.image-area {
  height: 120px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.image-placeholder {
  font-size: 48px;
}

.word-text {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.phonetic {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  cursor: pointer;
}

.meaning {
  font-size: 16px;
  color: #4A90E2;
  margin-bottom: 12px;
}

.example {
  font-size: 13px;
  color: #666;
  font-style: italic;
  margin-bottom: 8px;
}

.collocations {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.memory-tip {
  font-size: 12px;
  color: #F5A623;
  background: #fff8e6;
  padding: 8px;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.actions button {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-forgot {
  background: #F5222D;
  color: #fff;
}

.btn-vague {
  background: #FAAD14;
  color: #fff;
}

.btn-known {
  background: #52C41A;
  color: #fff;
}

.practice-section {
  margin: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.mode-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-card {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.mode-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.mode-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}

.mode-tag {
  font-size: 11px;
  color: #999;
}

.desktop-only {
  display: none;
}

.desktop-stats {
  display: none;
}

/* ========== 桌面端响应式 ========== */
@media (min-width: 768px) {
  .english-page {
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

  .word-card {
    margin: 0;
    padding: 32px;
  }

  .image-area {
    height: 160px;
  }

  .word-text {
    font-size: 36px;
  }

  .actions {
    padding: 16px 0;
  }

  .actions button {
    height: 52px;
    font-size: 16px;
  }

  .practice-section {
    margin: 0;
  }

  .mode-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .mode-card {
    padding: 20px;
  }

  .mode-label {
    font-size: 15px;
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
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>