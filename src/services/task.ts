import { isFullPage } from '@notionhq/client'

import extract from '@/helpers/extract'
import { ActivityService } from '@/services/activity'
import { NotionService } from '@/services/notion'
import { ProjectService } from '@/services/project'
import { SprintService } from '@/services/sprint'
import type { QueryDatabaseResponse } from '@/types/notion'
import type { Task } from '@/types/task'

/**
 * Service implementing methods relative to Tasks.
 */
class TaskService extends NotionService {
  private static DATABASE_ID = 'bcf348d1d13a445d88bb3899f8f89b7a'

  private readonly activityService: ActivityService
  private readonly projectService: ProjectService
  private readonly sprintService: SprintService

  constructor() {
    super()
    this.activityService = new ActivityService()
    this.projectService = new ProjectService()
    this.sprintService = new SprintService()
  }

  /**
   * Retrieve all tasks of a given Sprint.
   * @param sprintNumber
   */
  public async getTasksBySprint(sprintNumber: number): Promise<Task[]> {
    const sprint = await this.sprintService.getSprintByNumber(sprintNumber)

    if (!sprint)
      throw new Error(
        `Can't find any sprint with the given number: ${sprintNumber}`
      )

    const tasks: Task[] = []

    await this.withPagination(async (startCursor) => {
      const response: QueryDatabaseResponse = await this.notion.databases.query(
        {
          database_id: TaskService.DATABASE_ID,
          filter: {
            property: 'Sprint',
            relation: { contains: sprint.id },
          },
          ...(startCursor && { start_cursor: startCursor }),
        }
      )

      for (const result of response.results) {
        if (!isFullPage(result)) {
          console.warn(`Found a task which is not a full page: ${result.id}`)
          continue
        }

        const activityId = extract.relation(result.properties, 'Activity')[0]
        if (!activityId) {
          console.warn(`Found a task not linked to any activity: ${result.id}`)
          continue
        }
        const activity = await this.activityService.getActivityById(activityId)

        const projectId = extract.relation(result.properties, 'Project')[0]
        let project = null
        if (projectId)
          project = await this.projectService.getProjectById(projectId)

        const name = extract.name(result.properties, 'Name') ?? ''

        const duration = extract.formula(result.properties, 'Duration (h)')

        if (duration === null || !(typeof duration === 'number')) {
          console.warn(`Found a task without duration: ${result.id}`)
          continue
        }
        const start = extract.date(result.properties, 'Start Date')
        const end = extract.date(result.properties, 'End Date')

        if (!start || !end) {
          console.warn(`Found a task without start and end dates: ${result.id}`)
          continue
        }

        tasks.push({
          id: result.id,
          activity,
          duration,
          name,
          period: { start, end },
          project,
          sprint,
        })
      }

      return response
    })

    return tasks
  }
}

export { TaskService }
