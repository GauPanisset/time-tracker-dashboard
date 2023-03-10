import type { Activity } from '@/types/activity'
import type { Project } from '@/types/project'
import type {
  Period,
  SerializedPeriod,
  SerializedSprint,
  Sprint,
} from '@/types/sprint'

type SerializedTask = Omit<Task, 'period' | 'sprint'> & {
  period: SerializedPeriod
  sprint: SerializedSprint
}

type Task = {
  id: string
  activity: Activity
  duration: number
  name: string
  period: Period
  project: Project | null
  sprint: Sprint
}

type GroupedTasks = Record<string, SerializedTask[]>

export type { GroupedTasks, SerializedTask, Task }
