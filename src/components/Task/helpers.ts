import type { SerializedTask } from '@/types/task'

const getTaskWidth = (duration: SerializedTask['duration']): number => {
  return duration * 48
}

export { getTaskWidth }
