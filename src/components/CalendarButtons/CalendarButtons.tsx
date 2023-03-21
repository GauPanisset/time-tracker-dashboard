import { GroupKey } from '@/enums/group'

type Props = {
  isLoading: boolean
  onClick: (group: GroupKey) => void
}

const CalendarButtons: React.FunctionComponent<Props> = ({
  isLoading,
  onClick,
}) => {
  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group">
      <button
        className="rounded-l-lg border border-light/40 bg-dark px-4 py-2 font-medium text-light/90 hover:bg-dark/80 hover:text-light active:bg-dark/90 disabled:border-light/10 disabled:bg-dark/20 disabled:text-light/40"
        disabled={isLoading}
        name="days"
        onClick={() => onClick(GroupKey.Days)}
        type="button"
      >
        Days
      </button>
      <button
        className="border-y border-light/40 bg-dark px-4 py-2 font-medium text-light/90 hover:bg-dark/80 hover:text-light active:bg-dark/90 disabled:border-light/10 disabled:bg-dark/20 disabled:text-light/40"
        disabled={isLoading}
        name="activities"
        onClick={() => onClick(GroupKey.Activities)}
        type="button"
      >
        Activities
      </button>
      <button
        className="rounded-r-md border border-light/40 bg-dark px-4 py-2 font-medium text-light/90 hover:bg-dark/80 hover:text-light active:bg-dark/90 disabled:border-light/10 disabled:bg-dark/20 disabled:text-light/40"
        disabled={isLoading}
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
