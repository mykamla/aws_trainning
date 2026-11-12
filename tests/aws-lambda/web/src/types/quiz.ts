export type TopicId =
  | 'execution'
  | 'cold-starts'
  | 'concurrency'
  | 'triggers-http'
  | 'triggers-events'
  | 'triggers-queues'
  | 'iam'
  | 'vpc'
  | 'config'
  | 'packaging'
  | 'versions'
  | 'performance'
  | 'pricing'
  | 'retries'
  | 'observability'
  | 'events'
  | 'mixed'

export interface Choice {
  id: string
  text: string
}

export interface Question {
  id: string
  day: number
  topic: TopicId
  /** Énoncé en français. */
  stem: string
  /** Bloc de code / JSON / IAM optionnel. */
  code?: string
  choices: Choice[]
  correctChoiceId: string
  explanation: {
    correct: string
    incorrect?: string
    awsRule: string
    trap?: string
  }
}

export interface DayMeta {
  day: number
  title: string
  summary: string
  topics: TopicId[]
  isMock?: boolean
}

export interface AnswerRecord {
  questionId: string
  choiceId: string
  correct: boolean
  topic: TopicId
  answeredAt: number
}

export interface DayProgress {
  day: number
  currentIndex: number
  answers: AnswerRecord[]
  completed: boolean
  startedAt: number
  completedAt?: number
}

export interface AppProgress {
  version: 1
  days: Record<string, DayProgress>
  lastActiveDay: number | null
  updatedAt: number
}

/** Nombre de modules du parcours. */
export const MODULE_COUNT = 12
