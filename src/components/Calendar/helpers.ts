import type { GroupedTasks, SerializedTask } from '@/types/task'

import { height, marginX, marginY } from '@/components/Task/config'
import { getTaskWidth } from '@/components/Task/helpers'
import { GroupKey } from '@/enums/group'
import { TaskGrouper } from '@/services/taskGrouper'

type PositionTask = SerializedTask & {
  position: { x: number; y: number }
}

const groupBy = {
  [GroupKey.Activities]: new TaskGrouper(GroupKey.Activities).group,
  [GroupKey.Days]: new TaskGrouper(GroupKey.Days).group,
  [GroupKey.Projects]: new TaskGrouper(GroupKey.Projects).group,
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
const computeTasksPosition = (groupedTasks: GroupedTasks): PositionTask[] => {
  const positionedTasks: PositionTask[] = []

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
