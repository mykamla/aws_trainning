import type { DayMeta, TopicId } from '../types/quiz'

export const TOPIC_LABELS: Record<TopicId, string> = {
  execution: 'Exécution',
  'cold-starts': 'Cold starts',
  concurrency: 'Concurrence',
  'triggers-http': 'Triggers HTTP',
  'triggers-events': 'Triggers événements',
  'triggers-queues': 'Files & streams',
  iam: 'IAM',
  vpc: 'VPC',
  config: 'Config / Layers',
  packaging: 'Packaging',
  versions: 'Versions & alias',
  performance: 'Timeouts / mémoire',
  pricing: 'Tarification',
  retries: 'Retries / DLQ',
  observability: 'Logs / X-Ray',
  events: 'Events & context',
  mixed: 'Mixte',
}

export const CURRICULUM: DayMeta[] = [
  {
    day: 1,
    title: 'Modèle d’exécution',
    summary: 'Environnement d’exécution, handler, cycle de vie, isolation',
    topics: ['execution'],
  },
  {
    day: 2,
    title: 'Cold starts & warm',
    summary: 'Init, freeze/thaw, latence, bonnes pratiques',
    topics: ['cold-starts', 'execution'],
  },
  {
    day: 3,
    title: 'Concurrence',
    summary: 'Concurrence compte, réservée, provisionnée, throttling',
    topics: ['concurrency'],
  },
  {
    day: 4,
    title: 'Triggers HTTP',
    summary: 'API Gateway, ALB, Function URLs',
    topics: ['triggers-http'],
  },
  {
    day: 5,
    title: 'Triggers événements',
    summary: 'S3, EventBridge, SNS (aperçu)',
    topics: ['triggers-events'],
  },
  {
    day: 6,
    title: 'Files & streams',
    summary: 'SQS, DynamoDB Streams, batching, partial failures',
    topics: ['triggers-queues'],
  },
  {
    day: 7,
    title: 'IAM, VPC & config',
    summary: 'Rôles d’exécution, VPC ENI, env vars, layers',
    topics: ['iam', 'vpc', 'config'],
  },
  {
    day: 8,
    title: 'Packaging & versions',
    summary: 'Runtimes, zip/image, versions, alias, trafic',
    topics: ['packaging', 'versions'],
  },
  {
    day: 9,
    title: 'Perf, timeouts & prix',
    summary: 'Mémoire/CPU, timeouts, facturation GB-s',
    topics: ['performance', 'pricing'],
  },
  {
    day: 10,
    title: 'Retries, DLQ & obs.',
    summary: 'Destinations, DLQ, logs CloudWatch, X-Ray',
    topics: ['retries', 'observability', 'events'],
  },
  {
    day: 11,
    title: 'Examen blanc A',
    summary: 'Mixte — scénarios d’architecture Lambda',
    topics: ['mixed'],
    isMock: true,
  },
  {
    day: 12,
    title: 'Examen blanc B',
    summary: 'Mixte — pièges & edge cases AWS Lambda',
    topics: ['mixed'],
    isMock: true,
  },
]

export function getDayMeta(day: number): DayMeta | undefined {
  return CURRICULUM.find((d) => d.day === day)
}
