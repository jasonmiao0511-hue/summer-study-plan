<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)

function goFill() {
  store.completeStep('guide')
  router.push('/chinese-fill')
}
</script>

<template>
  <div class="guide-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">要点讲解</span>
      <span></span>
    </div>

    <div class="content">
      <h2 class="article-title">《{{ article?.title }}》</h2>

      <div class="section">
        <p class="section-title">📖 创作背景</p>
        <p class="section-body">{{ article?.background }}</p>
      </div>

      <div class="section">
        <p class="section-title">🎯 主题思想</p>
        <p class="section-body">{{ article?.theme }}</p>
      </div>

      <div class="section">
        <p class="section-title">✍️ 写作手法</p>
        <div class="tags">
          <span v-for="(t, i) in article?.techniques" :key="i" class="tag">{{ t }}</span>
        </div>
      </div>

      <div class="section">
        <p class="section-title">⭐ 名句赏析</p>
        <div v-for="(line, i) in article?.famousLines" :key="i" class="famous-line">
          <p class="line-quote">"{{ line }}"</p>
        </div>
      </div>
    </div>

    <button class="btn-next" @click="goFill">进入挖空练习</button>
  </div>
</template>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
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

.article-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.section-body {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #e6f7ff;
  color: #4A90E2;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.famous-line {
  background: #fff8e6;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
}

.line-quote {
  font-size: 15px;
  color: #333;
  font-style: italic;
}

.btn-next {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  height: 48px;
  background: #F5A623;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>