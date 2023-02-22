import Tooltip from '@/components/Tooltip'
import type { SerializedTask } from '@/types/task'

import { backgroundColorByActivity, height } from './config'
import { getTaskWidth } from './helpers'
import LoadingTask from './LoadingTask'

type Props = SerializedTask & { isLoading: boolean }

/**
 * Component displaying a task in the Calendar.
 */
const Task: React.FunctionComponent<Props> = ({
  activity,
  duration,
  isLoading,
  name,
}) => {
  if (isLoading)
    return <LoadingTask height={height} width={getTaskWidth(duration)} />

  return (
    <Tooltip text={name}>
      <div
        className={`rounded transition ${
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
