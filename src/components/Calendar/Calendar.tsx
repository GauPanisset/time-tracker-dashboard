import React from 'react'

import CalendarButtons from '@/components/CalendarButtons'
import Task from '@/components/Task'
import type { SerializedTask } from '@/types/task'

import {
  compareStartDate,
  compareTaskIds,
  groupBy,
  computeTasksPosition,
} from './helpers'
import { GroupKey } from './types'

type Props = {
  /**
   * List of tasks to display in the Calendar.
   */
  tasks: SerializedTask[]
}

/**
 * Component displaying a list of tasks grouped by day and sort by start date.
 */
const Calendar: React.FunctionComponent<Props> = ({ tasks: rawTasks }) => {
  const [groupByKey, setGroupByKey] = React.useState<GroupKey>(GroupKey.Days)

  const tasks = computeTasksPosition(
    groupBy[groupByKey](rawTasks.sort(compareStartDate))
  ).sort(compareTaskIds)

  const handleClick = (group: GroupKey) => {
    setGroupByKey(group)
  }

  return (
    <>
      <CalendarButtons onClick={handleClick} />
      <div className="relative">
        {tasks.map(({ position, ...task }) => (
          <div
            className="absolute transition-all duration-500"
            key={task.id}
            style={{ top: position.y, left: position.x }}
          >
            <Task {...task} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Calendar
