import { GroupKey } from '@/enums/group'
import type { GroupedTasks, SerializedTask } from '@/types/task'

type GroupByFunction = (tasks: SerializedTask[]) => {
  groups: GroupedTasks
  labels: Record<string, string>
}

/**
 * Service implementing methods to group Serialized Tasks.
 */
class TaskGrouper {
  private readonly groupKey: GroupKey

  constructor(groupKey: GroupKey) {
    this.groupKey = groupKey
  }

  get group(): GroupByFunction {
    return {
      [GroupKey.Activities]: this.groupByActivity,
      [GroupKey.Days]: this.groupByDay,
      [GroupKey.Projects]: this.groupByProject,
    }[this.groupKey]
  }

  /**
   * Group tasks by activity.
   * @param tasks list of tasks to group
   * @returns record with the activity id as key and the list of tasks as value.
   */
  private groupByActivity: GroupByFunction = (tasks) => {
    const groups: Record<string, SerializedTask[]> = {}
    const labels: Record<string, string> = {}

    for (const task of tasks) {
      const groupId = task.activity.name
      if (groupId in groups) groups[groupId].push(task)
      else {
        groups[groupId] = [task]
        labels[groupId] = task.activity.name
      }
    }

    return { groups, labels }
  }

  /**
   * Group tasks by day based on their start date.
   * @param tasks list of tasks to group
   * @returns record with the day number as key and the list of tasks as value.
   */
  private groupByDay: GroupByFunction = (tasks) => {
    const groups: Record<string, SerializedTask[]> = {}
    const labels: Record<string, string> = {}

    for (const task of tasks) {
      const groupId = String(
        new Date(task.period.start).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
        })
      )
      if (groupId in groups) groups[groupId].push(task)
      else {
        groups[groupId] = [task]
        labels[groupId] = groupId
      }
    }

    return { groups, labels }
  }

  /**
   * Group tasks by project.
   * @param tasks list of tasks to group
   * @returns record with the project id as key and the list of tasks as value.
   */
  private groupByProject: GroupByFunction = (tasks) => {
    const groups: Record<string, SerializedTask[]> = {}
    const labels: Record<string, string> = {}

    for (const task of tasks) {
      const groupId = task.project?.id ?? 'no-id'
      if (groupId in groups) groups[groupId].push(task)
      else {
        groups[groupId] = [task]
        labels[groupId] = task.project?.name ?? 'No project'
      }
    }

    return { groups, labels }
  }
}

export { TaskGrouper }
