<script setup lang="ts">
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

const subjectStats = [
  { subject: '英语', completed: 7, total: 7, status: '✅' },
  { subject: '语文', completed: 6, total: 7, status: '⚠️' },
  { subject: '数学', completed: 7, total: 7, status: '✅' }
]

function share() {
  alert('分享功能开发中')
}
</script>

<template>
  <div class="report-page">
    <!-- 桌面端侧边栏占位 -->
    <div class="sidebar-spacer desktop-only"></div>

    <div class="main-content">
      <div class="header">
        <span class="back" @click="$router.push('/home')">←</span>
        <span class="title">学习报告</span>
        <span></span>
      </div>

      <div class="desktop-layout">
        <!-- 左侧：图表 -->
        <div class="left-column">
          <div class="report-header">
            <p class="report-title">📊 本周学习报告</p>
            <p class="report-date">7月8日 - 7月14日</p>
          </div>

          <div class="chart-card">
            <p class="chart-title">三科投入时间</p>
            <div class="pie-chart">
              <div class="pie-placeholder">
                <div class="pie-center">
                  <p class="pie-total">{{ weekTotal }}分钟</p>
                </div>
              </div>
            </div>
            <div class="pie-legend">
              <span><span class="dot english"></span>英语 35%</span>
              <span><span class="dot chinese"></span>语文 30%</span>
              <span><span class="dot math"></span>数学 35%</span>
            </div>
          </div>

          <div class="week-chart">
            <p class="chart-title">每日学习时长</p>
            <div class="bars">
              <div v-for="d in weekData" :key="d.day" class="bar-item">
                <div class="bar" :style="{ height: d.minutes > 0 ? (d.minutes / 120 * 60) + 'px' : '4px', background: d.minutes > 0 ? '#4A90E2' : '#e0e0e0' }"></div>
                <span class="bar-day">{{ d.day }}</span>
                <span class="bar-val">{{ d.minutes }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：统计 + 分享 -->
        <div class="right-column">
          <div class="subject-card">
            <p class="card-title">任务完成情况</p>
            <div v-for="s in subjectStats" :key="s.subject" class="subject-item">
              <span class="subject-name">{{ s.subject }}</span>
              <span class="subject-progress">{{ s.completed }}/{{ s.total }} {{ s.status }}</span>
            </div>
          </div>

          <div class="stats-card desktop-stats">
            <p class="card-title">📈 数据概览</p>
            <div class="stat-grid">
              <div class="stat-box">
                <div class="stat-num">225</div>
                <div class="stat-label">本周分钟</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">32</div>
                <div class="stat-label">平均分钟/天</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">5</div>
                <div class="stat-label">学习天数</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">85%</div>
                <div class="stat-label">完成率</div>
              </div>
            </div>
          </div>

          <button class="btn-share" @click="share">分享本周报告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-page {
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

.report-header {
  text-align: center;
  margin-bottom: 16px;
}

.report-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.report-date {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  text-align: center;
}

.chart-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.pie-chart {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.pie-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #4A90E2 0deg 126deg,
    #F5A623 126deg 234deg,
    #52C41A 234deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-center {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-total {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.pie-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  color: #666;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}

.dot.english { background: #4A90E2; }
.dot.chinese { background: #F5A623; }
.dot.math { background: #52C41A; }

.week-chart {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 80px;
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
}

.bar-day {
  font-size: 12px;
  color: #666;
}

.bar-val {
  font-size: 11px;
  color: #999;
}

.subject-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.subject-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.btn-share {
  width: 100%;
  height: 48px;
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
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
  .report-page {
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

  .chart-card, .week-chart {
    margin: 0 0 16px;
  }

  .subject-card {
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

  .btn-share {
    margin-top: auto;
  }
}

@media (min-width: 1400px) {
  .right-column {
    width: 380px;
  }
}
</style>