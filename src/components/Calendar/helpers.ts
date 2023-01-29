import type { SerializedTask } from '@/types/task'

/**
 * Group tasks by day based on their start date.
 * @param tasks list of tasks to group
 * @returns record with the day number as key and the list of tasks as value.
 */
const groupByDay = (
  tasks: SerializedTask[]
): Record<string, SerializedTask[]> => {
  const groups: Record<string, SerializedTask[]> = {}

  for (const task of tasks) {
    const day = String(new Date(task.period.start).toLocaleDateString())
    if (day in groups) groups[day].push(task)
    else groups[day] = [task]
  }

  return groups
}

/**
 * Comparison function used to sort tasks by start date in ascending order.
 */
const sortByStartDate = (taskA: SerializedTask, taskB: SerializedTask) => {
  const dateA = new Date(taskA.period.start)
  const dateB = new Date(taskB.period.start)

  if (dateA > dateB) return 1
  if (dateA < dateB) return -1
  return 0
}

export { groupByDay, sortByStartDate }
