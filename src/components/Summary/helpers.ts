import type { GroupedTasks } from '@/types/task'

/**
 * Sum the duration of all tasks of the group.
 * @param groupedTasks record with the group id as key and the list of tasks as value.
 */
const sumGroupDuration = (groupedTasks: GroupedTasks) =>
  Object.fromEntries(
    Object.entries(groupedTasks).map(([group, tasks]) => [
      group,
      tasks.reduce((sum, task) => sum + task.duration, 0),
    ])
  )

/**
 * Compute the part of each group based on their duration in the whole record.
 * @param groupedDuration record with the group id as key and the duration as value
 */
const computeGroupDistribution = (groupedDuration: Record<string, number>) => {
  const total = Object.values(groupedDuration).reduce(
    (sum, duration) => sum + duration,
    0
  )
  return Object.fromEntries(
    Object.entries(groupedDuration).map(([group, duration]) => [
      group,
      Math.round((duration / total) * 100),
    ])
  )
}

/**
 * Sort group keys according to its duration.
 * @param groupedDuration record with the group id as key and the duration as value
 */
const sortGroupKeysByDuration = (groupedDuration: Record<string, number>) => {
  return Object.keys(groupedDuration).sort((groupA, groupB) => {
    return groupedDuration[groupB] - groupedDuration[groupA]
  })
}

export { computeGroupDistribution, sortGroupKeysByDuration, sumGroupDuration }
