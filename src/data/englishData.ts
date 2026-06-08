export interface Word {
  word: string
  phonetic: string
  meaning: string
  example: string
  collocations: string[]
  memoryTip: string
  imageKeyword: string
  distractors: string[]
}

export const englishWords: Word[] = [
  {
    word: 'ability',
    phonetic: '/əˈbɪləti/',
    meaning: 'n. 能力，才能',
    example: 'She has the ability to speak four languages.',
    collocations: ['have the ability to do sth'],
    memoryTip: 'able(能够) + ity(名词后缀)',
    imageKeyword: '山峰',
    distractors: ['接受，认可', '地址，演讲', '行动，行为']
  },
  {
    word: 'able',
    phonetic: '/ˈeɪbl/',
    meaning: 'adj. 能够的，有能力的',
    example: 'He is able to solve this problem.',
    collocations: ['be able to do sth'],
    memoryTip: 'a(一个) + ble(谐音"伯乐") → 伯乐有眼光',
    imageKeyword: '超人',
    distractors: ['关于', '在……上面', '接受']
  },
  {
    word: 'about',
    phonetic: '/əˈbaʊt/',
    meaning: 'prep. 关于；大约',
    example: 'Tell me about your school life.',
    collocations: ['talk about', 'think about'],
    memoryTip: 'a(一个) + bout(谐音"抱他") → 关于拥抱',
    imageKeyword: '对话',
    distractors: ['在……上面', '能力', '接受']
  },
  {
    word: 'above',
    phonetic: '/əˈbʌv/',
    meaning: 'prep. 在……上面',
    example: 'The plane flew above the clouds.',
    collocations: ['above all'],
    memoryTip: 'a + bove(谐音"波夫") → 波夫在上面',
    imageKeyword: '飞机',
    distractors: ['关于', '在……下面', '能力']
  },
  {
    word: 'accept',
    phonetic: '/əkˈsept/',
    meaning: 'v. 接受，认可',
    example: 'I accept your apology.',
    collocations: ['accept an invitation'],
    memoryTip: 'ac(一再) + cept(拿) → 一再拿 → 接受',
    imageKeyword: '握手',
    distractors: ['能力', '地址', '行动']
  },
  {
    word: 'accident',
    phonetic: '/ˈæksɪdənt/',
    meaning: 'n. 事故，意外',
    example: 'He had a car accident yesterday.',
    collocations: ['by accident'],
    memoryTip: 'ac(一再) + cid(落下) + ent → 一再落下 → 意外',
    imageKeyword: '汽车碰撞',
    distractors: ['事件', '活动', '成就']
  },
  {
    word: 'achieve',
    phonetic: '/əˈtʃiːv/',
    meaning: 'v. 达到，实现',
    example: 'She achieved her goal.',
    collocations: ['achieve success', 'achieve a goal'],
    memoryTip: 'a(一) + chieve(谐音"吃屋") → 吃了一屋子才实现',
    imageKeyword: '奖杯',
    distractors: ['接受', '到达', '承认']
  },
  {
    word: 'across',
    phonetic: '/əˈkrɒs/',
    meaning: 'prep. 横过，穿过',
    example: 'Walk across the street.',
    collocations: ['come across', 'get across'],
    memoryTip: 'a(一) + cross(十字) → 穿过十字路口',
    imageKeyword: '斑马线',
    distractors: ['穿过', '通过', '超过']
  },
  {
    word: 'act',
    phonetic: '/ækt/',
    meaning: 'v. 行动，表演；n. 行为',
    example: 'We must act now.',
    collocations: ['act as', 'take action'],
    memoryTip: '谐音"爱可特" → 爱可以特别行动',
    imageKeyword: '演员',
    distractors: ['艺术', '部分', '事实']
  },
  {
    word: 'action',
    phonetic: '/ˈækʃn/',
    meaning: 'n. 行动，行为',
    example: 'Actions speak louder than words.',
    collocations: ['take action'],
    memoryTip: 'act(行动) + ion(名词后缀)',
    imageKeyword: '奔跑',
    distractors: ['活动', '表演', '艺术']
  }
]

// 补充到500词的占位 - 实际开发中会继续填充
for (let i = 10; i < 500; i++) {
  englishWords.push({
    word: `word${i}`,
    phonetic: '/wɜːrd/',
    meaning: `n. 单词${i}`,
    example: `This is example sentence for word${i}.`,
    collocations: ['word list'],
    memoryTip: `记忆法${i}`,
    imageKeyword: '书本',
    distractors: ['选项A', '选项B', '选项C']
  })
}
