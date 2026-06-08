import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 启动与引导
  { path: '/', name: 'Splash', component: () => import('../views/startup/SplashView.vue') },
  { path: '/guide-time', name: 'GuideTime', component: () => import('../views/startup/GuideTimeView.vue') },
  { path: '/guide-daily', name: 'GuideDaily', component: () => import('../views/startup/GuideDailyView.vue') },
  { path: '/guide-plan', name: 'GuidePlan', component: () => import('../views/startup/GuidePlanView.vue') },

  // 首页
  { path: '/home', name: 'Home', component: () => import('../views/home/HomeView.vue') },

  // 计划中心
  { path: '/plan', name: 'Plan', component: () => import('../views/plan/PlanView.vue') },
  { path: '/plan-adjust', name: 'PlanAdjust', component: () => import('../views/plan/PlanAdjustView.vue') },

  // 英语学习
  { path: '/english', name: 'English', component: () => import('../views/english/EnglishView.vue') },
  { path: '/english-practice', name: 'EnglishPractice', component: () => import('../views/english/EnglishPracticeView.vue') },
  { path: '/english-quiz', name: 'EnglishQuiz', component: () => import('../views/english/EnglishQuizView.vue') },
  { path: '/english-spelling', name: 'EnglishSpelling', component: () => import('../views/english/EnglishSpellingView.vue') },
  { path: '/english-report', name: 'EnglishReport', component: () => import('../views/english/EnglishReportView.vue') },

  // 语文学习
  { path: '/chinese', name: 'Chinese', component: () => import('../views/chinese/ChineseView.vue') },
  { path: '/chinese-read', name: 'ChineseRead', component: () => import('../views/chinese/ChineseReadView.vue') },
  { path: '/chinese-guide', name: 'ChineseGuide', component: () => import('../views/chinese/ChineseGuideView.vue') },
  { path: '/chinese-fill', name: 'ChineseFill', component: () => import('../views/chinese/ChineseFillView.vue') },
  { path: '/chinese-fill-result', name: 'ChineseFillResult', component: () => import('../views/chinese/ChineseFillResultView.vue') },
  { path: '/chinese-write', name: 'ChineseWrite', component: () => import('../views/chinese/ChineseWriteView.vue') },
  { path: '/chinese-write-result', name: 'ChineseWriteResult', component: () => import('../views/chinese/ChineseWriteResultView.vue') },

  // 数学学习
  { path: '/math', name: 'Math', component: () => import('../views/math/MathView.vue') },
  { path: '/math-detail', name: 'MathDetail', component: () => import('../views/math/MathDetailView.vue') },
  { path: '/math-checkin', name: 'MathCheckin', component: () => import('../views/math/MathCheckinView.vue') },
  { path: '/math-network', name: 'MathNetwork', component: () => import('../views/math/MathNetworkView.vue') },

  // 数据中心
  { path: '/report', name: 'Report', component: () => import('../views/data-center/ReportView.vue') },
  { path: '/mistakes', name: 'Mistakes', component: () => import('../views/data-center/MistakesView.vue') },
  { path: '/achievements', name: 'Achievements', component: () => import('../views/data-center/AchievementsView.vue') },

  // 个人中心
  { path: '/profile', name: 'Profile', component: () => import('../views/profile/ProfileView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
