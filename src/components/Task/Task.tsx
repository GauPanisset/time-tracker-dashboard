import Tooltip from '@/components/Tooltip'
import type { SerializedTask } from '@/types/task'

import { backgroundColorByActivity, height } from './config'
import { getTaskWidth } from './helpers'

type Props = SerializedTask

/**
 * Component displaying a task in the Calendar.
 */
const Task: React.FunctionComponent<Props> = ({ activity, duration, name }) => {
  return (
    <Tooltip text={name}>
      <div
        className={`rounded border border-dark transition ${
          backgroundColorByActivity[activity.name]
        }`}
        style={{
          height,
          width: getTaskWidth(duration),
        }}
      />
    </Tooltip>
  )
}

export default Task
