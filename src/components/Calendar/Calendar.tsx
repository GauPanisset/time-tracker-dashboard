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
import loadingTasks from './loadingTasks.json'
import { GroupedTasks, GroupKey } from './types'

type Props = {
  /**
   * Whether the Calendar is in loading state or not.
   */
  isLoading: boolean
  /**
   * List of tasks to display in the Calendar.
   */
  tasks?: SerializedTask[]
}

/**
 * Component displaying a list of tasks grouped by day and sort by start date.
 */
const Calendar: React.FunctionComponent<Props> = ({
  isLoading,
  tasks: rawTasks = [],
}) => {
  const [groupByKey, setGroupByKey] = React.useState<GroupKey>(GroupKey.Days)

  const { groups: groupedTasks, labels } = isLoading
    ? { groups: loadingTasks as unknown as GroupedTasks, labels: null }
    : groupBy[groupByKey](rawTasks.sort(compareStartDate))
  const tasks = computeTasksPosition(groupedTasks).sort(compareTaskIds)

  const handleClick = (group: GroupKey) => {
    setGroupByKey(group)
  }

  return (
    <div className="min-w-min rounded-xl border border-light/40 bg-mid/10 shadow-lg">
      <div className="flex h-14 items-center justify-between rounded-t-xl border-light/40 bg-mid px-4">
        <p className="mr-4 text-base font-bold text-dark sm:text-3xl">Tasks</p>
        <CalendarButtons isLoading={isLoading} onClick={handleClick} />
      </div>
      <div className="overflow-x-scroll">
        <div
          className="m-8 flex overflow-y-visible transition-all"
          style={{
            height: Object.keys(groupedTasks).length * (height + marginY),
          }}
        >
          <div className="mr-4 flex max-w-[33%] flex-col">
            {Object.keys(groupedTasks).map((group) => (
              <div
                className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm"
                key={group}
                style={{ height, marginBottom: marginY }}
              >
                {labels ? labels[group] : ''}
              </div>
            ))}
          </div>
          <div className="relative">
            {tasks.length ? (
              tasks.map(({ position, ...task }) => (
                <div
                  className="absolute transition-all duration-500"
                  key={task.id}
                  style={{ top: position.y, left: position.x }}
                >
                  <Task {...task} isLoading={isLoading} />
                </div>
              ))
            ) : (
              <div>No data available...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
