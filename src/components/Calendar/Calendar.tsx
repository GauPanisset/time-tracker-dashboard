import React from 'react'

import CalendarButtons from '@/components/CalendarButtons'
import Task from '@/components/Task'
import { height, marginY } from '@/components/Task/config'
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

  const groupedTasks = groupBy[groupByKey](rawTasks.sort(compareStartDate))
  const tasks = computeTasksPosition(groupedTasks).sort(compareTaskIds)

  const handleClick = (group: GroupKey) => {
    setGroupByKey(group)
  }

  return (
    <div className="rounded-xl border border-light/40 bg-mid/10">
      <div className="rounded-t-xl border-light/40 bg-mid p-2">
        <CalendarButtons onClick={handleClick} />
      </div>
      <div className="overflow-x-scroll">
        <div
          className="relative m-8 overflow-y-visible transition-all"
          style={{
            height: Object.keys(groupedTasks).length * (height + marginY),
          }}
        >
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
      </div>
    </div>
  )
}

export default Calendar
