import type { Question } from '../types/quiz'
import { day01 } from './days/day01'
import { day02 } from './days/day02'
import { day03 } from './days/day03'
import { day04 } from './days/day04'
import { day05 } from './days/day05'
import { day06 } from './days/day06'
import { day07 } from './days/day07'
import { day08 } from './days/day08'
import { day09 } from './days/day09'
import { day10 } from './days/day10'
import { day11 } from './days/day11'
import { day12 } from './days/day12'

const ALL_DAYS: Record<number, Question[]> = {
  1: day01,
  2: day02,
  3: day03,
  4: day04,
  5: day05,
  6: day06,
  7: day07,
  8: day08,
  9: day09,
  10: day10,
  11: day11,
  12: day12,
}

export function getQuestionsForDay(day: number): Question[] {
  return ALL_DAYS[day] ?? []
}

export function getQuestionCounts(): Map<number, number> {
  const map = new Map<number, number>()
  for (const [day, qs] of Object.entries(ALL_DAYS)) {
    map.set(Number(day), qs.length)
  }
  return map
}

export function getAllQuestions(): Question[] {
  return Object.values(ALL_DAYS).flat()
}
