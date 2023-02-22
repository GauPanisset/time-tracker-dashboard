import React from 'react'

const backgroundColors = ['bg-gray-500', 'bg-gray-600', 'bg-gray-700']

type Props = {
  height: number
  width: number
}

/**
 * Component displaying a task in the Calendar in the loading state.
 */
const LoadingTask: React.FunctionComponent<Props> = ({ height, width }) => {
  const [backgroundColor, setBackgroundColor] = React.useState(
    backgroundColors[0]
  )

  React.useEffect(() => {
    setBackgroundColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    )
  }, [])

  return (
    <div
      className={`animate-pulse rounded ${backgroundColor}`}
      style={{ height, width }}
    />
  )
}

export default LoadingTask
