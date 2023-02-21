import useSwr from 'swr'

import Calendar from '@/components/Calendar'
import SprintPicker from '@/components/SprintPicker'
import type { SerializedTask } from '@/types/task'
import React from 'react'

/**
 * Landing page of the application.
 */
const Home = () => {
  const [sprint, setSprint] = React.useState(16)

  const { data, isLoading } = useSwr<SerializedTask[]>(
    `/api/sprint/${sprint}/tasks`
  )

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Not data found...</div>

  return (
    <div className="flex w-full gap-4">
      <div className="w-1/6">
        <SprintPicker value={sprint} onChange={setSprint} />
      </div>
      <div className="w-4/6">
        <Calendar tasks={data} />
      </div>
    </div>
  )
}

export default Home
