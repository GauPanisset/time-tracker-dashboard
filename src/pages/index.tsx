import useSwr from 'swr'
import React from 'react'

import Calendar from '@/components/Calendar'
import SprintPicker from '@/components/SprintPicker'
import type { SerializedTask } from '@/types/task'

/**
 * Landing page of the application.
 */
const Home = () => {
  const [sprint, setSprint] = React.useState(16)

  const { data, isLoading } = useSwr<SerializedTask[]>(
    `/api/sprint/${sprint}/tasks`
  )

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="w-5/12 md:w-2/12">
        <SprintPicker value={sprint} onChange={setSprint} />
      </div>
      <div className="w-full md:w-6/12">
        <Calendar tasks={data} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Home
