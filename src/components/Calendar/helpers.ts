import type { SerializedTask } from '@/types/task'

import { height, marginX, marginY } from '@/components/Task/config'
import { getTaskWidth } from '@/components/Task/helpers'

import { GroupKey } from './types'
import type { GroupedTasks, GroupByFunction } from './types'

/**
 * Group tasks by activity.
 * @param tasks list of tasks to group
 * @returns record with the activity id as key and the list of tasks as value.
 */
const groupByActivity: GroupByFunction = (tasks) => {
  const groups: Record<string, SerializedTask[]> = {}

  for (const task of tasks) {
    const taskActivityId = task.activity.id
    if (taskActivityId in groups) groups[taskActivityId].push(task)
    else groups[taskActivityId] = [task]
  }

  return groups
}

/**
 * Group tasks by day based on their start date.
 * @param tasks list of tasks to group
 * @returns record with the day number as key and the list of tasks as value.
 */
const groupByDay: GroupByFunction = (tasks) => {
  const groups: Record<string, SerializedTask[]> = {}

  for (const task of tasks) {
    const day = String(new Date(task.period.start).toLocaleDateString())
    if (day in groups) groups[day].push(task)
    else groups[day] = [task]
  }

  return groups
}

/**
 * Group tasks by project.
 * @param tasks list of tasks to group
 * @returns record with the project id as key and the list of tasks as value.
 */
const groupByProject: GroupByFunction = (tasks) => {
  const groups: Record<string, SerializedTask[]> = {}

  for (const task of tasks) {
    const taskProjectId = task.project?.id ?? 'no-id'
    if (taskProjectId in groups) groups[taskProjectId].push(task)
    else groups[taskProjectId] = [task]
  }

  return groups
}

const groupBy = {
  [GroupKey.Activities]: groupByActivity,
  [GroupKey.Days]: groupByDay,
  [GroupKey.Projects]: groupByProject,
}

/**
 * Comparison function used to sort tasks by start date in ascending order.
 */
const compareStartDate = (taskA: SerializedTask, taskB: SerializedTask) => {
  const dateA = new Date(taskA.period.start)
  const dateB = new Date(taskB.period.start)

  if (dateA > dateB) return 1
  if (dateA < dateB) return -1
  return 0
}

/**
 * Comparison function used to sort tasks by id.
 * This is needed to keep the same rendering order.
 */
const compareTaskIds = (taskA: SerializedTask, taskB: SerializedTask) => {
  const idA = taskA.id
  const idB = taskB.id

  if (idA > idB) return 1
  if (idA < idB) return -1
  return 0
}

/**
 * Compute the position of all tasks based on their group and order in the group.
 * @param groupedTasks all tasks grouped
 * @returns a list of tasks with their position in the calendar
 */
const computeTasksPosition = (
  groupedTasks: GroupedTasks
): (SerializedTask & { position: { x: number; y: number } })[] => {
  const positionedTasks: (SerializedTask & {
    position: { x: number; y: number }
  })[] = []

  const groups = Object.values(groupedTasks)

  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    let groupOffset = 0
    const group = groups[groupIndex]

    for (let taskIndex = 0; taskIndex < group.length; taskIndex++) {
      const task = group[taskIndex]

      positionedTasks.push({
        ...task,
        position: {
          x: groupOffset,
          y: groupIndex * (height + marginY),
        },
      })

      groupOffset += getTaskWidth(task.duration) + marginX
    }
  }

  return positionedTasks
}

export { compareStartDate, compareTaskIds, computeTasksPosition, groupBy }
