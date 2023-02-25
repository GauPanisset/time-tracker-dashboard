import { backgroundColorByActivity } from '@/components/Task/config'
import { isActivity } from '@/enums/activity'
import { GroupKey } from '@/enums/group'
import { TaskGrouper } from '@/services/taskGrouper'
import type { SerializedTask } from '@/types/task'

import {
  computeGroupDistribution,
  sortGroupKeysByDuration,
  sumGroupDuration,
} from './helpers'

const groupTaskByActivities = new TaskGrouper(GroupKey.Activities).group
const groupTaskByProjects = new TaskGrouper(GroupKey.Projects).group

type Props = {
  isLoading: boolean
  tasks?: SerializedTask[]
}

const Summary: React.FunctionComponent<Props> = ({ isLoading, tasks }) => {
  const { groups: tasksByActivities, labels: activities } =
    groupTaskByActivities(tasks ?? [])
  const { groups: tasksByProjects, labels: projects } = groupTaskByProjects(
    tasks ?? []
  )

  const durationByActivities = sumGroupDuration(tasksByActivities)
  const durationByProjects = sumGroupDuration(tasksByProjects)
  const activitiesPart = computeGroupDistribution(durationByActivities)
  const projectsPart = computeGroupDistribution(durationByProjects)

  const loadingContent = Array.from({ length: 4 })
    .fill(0)
    .map((_, index) => (
      <div
        key={`loading-${index}`}
        className="my-1 flex animate-pulse items-center border-b-[1px] border-b-mid/50 py-1 last-of-type:border-0"
      >
        <div className="mr-4 h-4 w-4 rounded bg-white" />
        <div className="mr-4 h-4 flex-1 rounded bg-gray-500" />
        <div className="mr-4 h-4 w-2/12 rounded bg-gray-500" />
        <div className="h-4 w-2/12 rounded bg-gray-700" />
      </div>
    ))

  return (
    <div className="rounded-xl border border-light/40 bg-mid/10 shadow-lg">
      <div className="flex h-14 items-center rounded-t-xl border-light/40 bg-mid px-4">
        <p className="mr-4 text-base font-bold text-dark sm:text-3xl">
          Hours spent
        </p>
      </div>
      <div className="flex flex-col p-8 md:flex-row">
        <div className="mb-8 w-full md:mb-0 md:mr-8 md:w-6/12">
          <div className="mb-4 text-2xl font-bold">By activities</div>
          {isLoading
            ? loadingContent
            : sortGroupKeysByDuration(durationByActivities).map((group) => {
                const activity = activities[group]
                const duration = durationByActivities[group]
                return (
                  <div
                    key={group}
                    className="my-1 flex items-center border-b-[1px] border-b-mid/50 py-1 last-of-type:border-0"
                  >
                    <div
                      className={`mr-4 h-4 w-4 rounded ${
                        isActivity(activity)
                          ? backgroundColorByActivity[activity]
                          : 'bg-white'
                      }`}
                    />
                    <div className="flex-1 font-medium">{activity}</div>
                    <div className="w-2/12 text-light">{`${duration}`}</div>
                    <div className="w-2/12 text-light/50">{`(${activitiesPart[group]}%)`}</div>
                  </div>
                )
              })}
        </div>
        <div className="w-full md:w-6/12">
          <div className="mb-4 text-2xl font-bold">By projects</div>
          {isLoading
            ? loadingContent
            : sortGroupKeysByDuration(durationByProjects).map((group) => {
                const duration = durationByProjects[group]
                return (
                  <div
                    key={group}
                    className="my-1 flex items-center border-b-[1px] border-b-mid/50 py-1 last-of-type:border-0"
                  >
                    <div className="mr-4 h-4 w-4 rounded bg-white" />
                    <div className="mr-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">{`${projects[group]}`}</div>
                    <div className="w-2/12 text-light">{`${duration}`}</div>
                    <div className="w-2/12 text-light/50">{`(${projectsPart[group]}%)`}</div>
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Summary
