import useSwr from 'swr'
import React from 'react'

import Calendar from '@/components/Calendar'
import SprintPicker from '@/components/SprintPicker'
import Summary from '@/components/Summary'
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
    <div className="grid w-full grid-cols-12 flex-wrap gap-4">
      <div className="col-span-6 md:col-span-2">
        <SprintPicker value={sprint} onChange={setSprint} />
      </div>
      <div className="col-span-12 md:col-span-10">
        <Calendar tasks={data} isLoading={isLoading} />
      </div>
      <div className="col-start-1 col-end-13 md:col-start-3">
        <Summary tasks={data} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Home
