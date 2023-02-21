import useSwr from 'swr'

import Calendar from '@/components/Calendar'
import type { SerializedTask } from '@/types/task'

/**
 * Landing page of the application.
 */
const Home = () => {
  const { data, isLoading } = useSwr<SerializedTask[]>('/api/sprint/16/tasks')

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Not data found...</div>

  return (
    <div className="max-w-lg">
      <Calendar tasks={data} />
    </div>
  )
}

export default Home
