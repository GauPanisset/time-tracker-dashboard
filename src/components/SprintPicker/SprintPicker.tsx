import useSwr from 'swr'

import type { SerializedSprint } from '@/types/sprint'
import React from 'react'

type Props = { value: number; onChange: (sprint: number) => void }

/**
 * Component displaying the sprint to display and two button to increase and decrease this number.
 */
const SprintPicker: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const { data, isLoading } = useSwr<SerializedSprint[]>(`/api/sprints`)

  const [maxValue, minValue] = React.useMemo(() => {
    if (!data || !data.length) return [1, 1]
    const sprintNumbers = data.map((sprint) => sprint?.number)

    return [Math.max(...sprintNumbers), Math.min(...sprintNumbers)]
  }, [data])

  /**
   * Set the current sprint to the last one.
   */
  React.useEffect(() => {
    onChange(maxValue)
  }, [maxValue, onChange])

  return (
    <div className="flex flex-col items-center overflow-hidden rounded-xl border border-light/40 bg-mid/10 shadow-lg">
      <div className="flex w-full items-center justify-center bg-mid px-4 py-2">
        <p className="text-base font-bold text-dark sm:text-3xl">Sprint</p>
      </div>
      <div className="flex w-full items-center justify-between py-4 px-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-light/20 active:bg-light/30 disabled:bg-transparent disabled:opacity-40"
          disabled={value === minValue}
          onClick={() => {
            onChange(value - 1)
          }}
        >
          <div className="h-3 w-3 translate-x-1/4 rotate-45 border-l-2 border-b-2" />
        </button>
        {isLoading ? (
          <div className="h-16 w-16 animate-pulse rounded bg-gray-500" />
        ) : (
          <div className="text-3xl font-bold md:text-6xl">{value}</div>
        )}

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-light/20 active:bg-light/30 disabled:bg-transparent disabled:opacity-40"
          disabled={value === maxValue}
          onClick={() => {
            onChange(value + 1)
          }}
        >
          <div className="h-3 w-3 -translate-x-1/4 rotate-45 border-r-2 border-t-2" />
        </button>
      </div>
    </div>
  )
}
export default SprintPicker
