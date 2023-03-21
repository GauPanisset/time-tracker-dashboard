import Tooltip from '@/components/Tooltip'
import type { SerializedTask } from '@/types/task'

import { backgroundColorByActivity, height } from './config'
import { getTaskWidth } from './helpers'
import LoadingTask from './LoadingTask'

type Props = SerializedTask & {
  isHighlighted?: boolean
  isLoading?: boolean
  isMinimized?: boolean
}

/**
 * Component displaying a task in the Calendar.
 */
const Task: React.FunctionComponent<Props> = ({
  activity,
  duration,
  isHighlighted,
  isLoading,
  isMinimized,
  name,
}) => {
  if (isLoading)
    return <LoadingTask height={height} width={getTaskWidth(duration)} />

  return (
    <Tooltip text={name}>
      <div
        className={`rounded transition duration-500 ${
          backgroundColorByActivity[activity.name]
        } ${isHighlighted ? 'shadow shadow-dark' : ''} ${
          isMinimized ? 'opacity-20' : ''
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
