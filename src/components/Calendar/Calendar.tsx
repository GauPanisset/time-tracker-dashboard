import type { SerializedTask } from '@/types/task'

import Task from '@/components/Task'

import { groupByDay, sortByStartDate } from './helpers'

type Props = {
  /**
   * List of tasks to display in the Calendar.
   */
  tasks: SerializedTask[]
}

/**
 * Component displaying a list of tasks grouped by day and sort by start date.
 */
const Calendar: React.FunctionComponent<Props> = ({ tasks }) => {
  return (
    <>
      {Object.entries(groupByDay(tasks.sort(sortByStartDate))).map(
        ([day, group], index) => (
          <div className="flex" key={day}>
            {group.map((task) => (
              <Task key={task.id} {...task} />
            ))}
            {(index + 1) % 5 === 0 && <div className="h-8" />}
          </div>
        )
      )}
    </>
  )
}

export default Calendar
