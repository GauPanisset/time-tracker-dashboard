import type { Activity } from '@/types/activity'
import type { Project } from '@/types/project'
import type { Period, Sprint } from '@/types/sprint'

type Task = {
  id: string
  activity: Activity
  duration: number
  name: string
  period: Period
  project: Project | null
  sprint: Sprint
}

export type { Task }
