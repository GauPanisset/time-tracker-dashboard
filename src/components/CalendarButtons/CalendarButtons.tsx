import { GroupKey } from '@/components/Calendar/types'

type Props = {
  onClick: (group: GroupKey) => void
}

const CalendarButtons: React.FunctionComponent<Props> = ({ onClick }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        className="rounded-l-lg border border-light/40 bg-mid px-4 py-2 text-sm font-medium text-dark/90 hover:bg-mid/80 hover:text-dark"
        name="days"
        onClick={() => onClick(GroupKey.Days)}
        type="button"
      >
        Days
      </button>
      <button
        className="border-y border-light/40 bg-mid px-4 py-2 text-sm font-medium text-dark/90 hover:bg-mid/80 hover:text-dark"
        name="activities"
        onClick={() => onClick(GroupKey.Activities)}
        type="button"
      >
        Activities
      </button>
      <button
        className="rounded-r-md border border-light/40 bg-mid px-4 py-2 text-sm font-medium text-dark/90 hover:bg-mid/80 hover:text-dark"
        name="projects"
        onClick={() => onClick(GroupKey.Projects)}
        type="button"
      >
        Projects
      </button>
    </div>
  )
}

export default CalendarButtons
