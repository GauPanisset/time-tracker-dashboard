import { SerializedTask } from '@/types/task'

enum GroupKey {
  Activities = 'Activities',
  Days = 'Days',
  Projects = 'Projects',
}

type GroupByFunction = (tasks: SerializedTask[]) => {
  groups: GroupedTasks
  labels: Record<string, string>
}

type GroupedTasks = Record<string, SerializedTask[]>

export { GroupKey }
export type { GroupByFunction, GroupedTasks }
