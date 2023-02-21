import { SerializedTask } from '@/types/task'

enum GroupKey {
  Activities = 'Activities',
  Days = 'Days',
  Projects = 'Projects',
}

type GroupByFunction = (tasks: SerializedTask[]) => GroupedTasks

type GroupedTasks = Record<string, SerializedTask[]>

export { GroupKey }
export type { GroupByFunction, GroupedTasks }
