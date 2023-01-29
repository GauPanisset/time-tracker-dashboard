import Tooltip from '@/components/Tooltip'
import type { SerializedTask } from '@/types/task'

import { backgroundColorByActivity } from './config'

type Props = SerializedTask

/**
 * Component displaying a task in the Calendar.
 */
const Task: React.FunctionComponent<Props> = ({ activity, duration, name }) => {
  return (
    <Tooltip text={name}>
      <div
        className={`my-1 h-4 border border-dark ${
          backgroundColorByActivity[activity.name]
        }`}
        style={{ width: duration * 48 }}
      />
    </Tooltip>
  )
}

export default Task
