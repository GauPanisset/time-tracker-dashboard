import React from 'react'

import CalendarButtons from '@/components/CalendarButtons'
import CalendarSelect from '@/components/CalendarSelect'
import Task from '@/components/Task'
import { height, marginY } from '@/components/Task/config'
import { GroupKey } from '@/enums/group'
import type { GroupedTasks, SerializedTask } from '@/types/task'

import {
  compareStartDate,
  compareTaskIds,
  groupBy,
  computeTasksPosition,
} from './helpers'
import loadingTasks from './loadingTasks.json'

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
  /**
   * Id of the project to use as filter in the Calendar
   */
  const [projectFilter, setProjectFilter] = React.useState<string>()
  const [groupByKey, setGroupByKey] = React.useState<GroupKey>(GroupKey.Days)

  const { groups: groupedTasks, labels } = isLoading
    ? { groups: loadingTasks as unknown as GroupedTasks, labels: null }
    : groupBy[groupByKey](rawTasks.sort(compareStartDate))
  const tasks = computeTasksPosition(groupedTasks).sort(compareTaskIds)

  /**
   * Project select items.
   */
  const items = React.useMemo(
    () =>
      rawTasks.reduce((acc, task) => {
        if (
          task.project?.id &&
          !acc.map((item) => item.value).includes(task.project?.id)
        )
          return [...acc, { value: task.project.id, label: task.project.name }]
        return acc
      }, [] as { value: string; label: string }[]),
    [rawTasks]
  )

  /**
   * Little trick to reset the project filter on tasks change.
   */
  const firstTaskId = rawTasks?.[0]?.id
  React.useEffect(() => {
    setProjectFilter(undefined)
  }, [firstTaskId])

  const handleClick = (group: GroupKey) => {
    setGroupByKey(group)
  }

  const handleChangeProjectFilter = (
    event: React.ChangeEvent<HTMLSelectElement> | null
  ) => {
    setProjectFilter(event?.target.value)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-light/40 bg-mid/10 shadow-lg">
      <div className="flex flex-col justify-between bg-mid px-4 py-2 sm:flex-row">
        <p className="mb-2 align-middle text-base font-bold text-dark sm:mr-4 sm:mb-0 sm:self-center sm:text-3xl">
          Tasks
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="mb-2 flex sm:mr-4 sm:mb-0">
            <CalendarSelect
              isLoading={isLoading}
              items={items}
              onChange={handleChangeProjectFilter}
              placeholder="Choose a project to highlight tasks..."
              value={projectFilter}
            />
          </div>
          <CalendarButtons isLoading={isLoading} onClick={handleClick} />
        </div>
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
                className="overflow-hidden text-ellipsis whitespace-nowrap font-mono leading-4"
                key={group}
                style={{ height, marginBottom: marginY }}
              >
                {labels ? labels[group] : ''}
              </div>
            ))}
          </div>
          <div className="relative">
            {tasks.length ? (
              tasks.map(({ position, ...task }) => {
                const isHighlighted = task.project?.id === projectFilter
                return (
                  <div
                    className="absolute transition-all duration-500"
                    key={task.id}
                    style={{
                      top: position.y,
                      left: position.x,
                    }}
                  >
                    <Task
                      {...task}
                      isLoading={isLoading}
                      isHighlighted={isHighlighted}
                      isMinimized={Boolean(projectFilter) && !isHighlighted}
                    />
                  </div>
                )
              })
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
