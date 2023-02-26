import { isFullPage } from '@notionhq/client'

import extract from '@/helpers/extract'
import { isNotNull } from '@/helpers/isNotNull'
import { CacheService } from '@/services/cache'
import type { Sprint } from '@/types/sprint'
import type { PageObjectResponse } from '@/types/notion'
import { NotionService } from '@/services/notion'

/**
 * Service implementing methods relative to Sprints.
 */
class SprintService extends NotionService {
  private static DATABASE_ID = process.env.SPRINT_DATABASE_ID ?? ''

  private readonly cacheService: CacheService<Sprint>

  constructor() {
    super()
    this.cacheService = new CacheService<Sprint>()
  }

  /**
   * Retrieve the list of all Sprints.
   */
  public async getSprints(): Promise<Sprint[]> {
    const response = await this.notion.databases.query({
      database_id: SprintService.DATABASE_ID,
    })

    return response.results
      .map((result, index) => {
        if (!result || !isFullPage(result)) {
          console.error(
            `Result is not a full page. (${result} - index: ${index})`
          )
          return null
        }
        return this.createSprint(result)
      })
      .filter(isNotNull)
  }

  /**
   * Retrieve a Sprint given its number.
   * @param sprintNumber sprint number
   */
  public async getSprintByNumber(sprintNumber: number): Promise<Sprint> {
    return this.cacheService.withCache(String(sprintNumber), async () => {
      const response = await this.notion.databases.query({
        database_id: SprintService.DATABASE_ID,
        filter: {
          property: 'Name',
          rich_text: { equals: `Sprint ${sprintNumber}` },
        },
      })

      const result = response.results[0]

      if (!result || !isFullPage(result))
        throw new Error(`Result is not a full page.`)

      return this.createSprint(result)
    })
  }

  /**
   * Reshape Notion results into Sprints.
   * @param result notion results
   */
  private createSprint(result: PageObjectResponse): Sprint {
    const period = extract.period(result.properties, 'Period')
    if (!period)
      throw new Error(
        `A Sprint must have a period, but missing for Sprint ${result.id}`
      )

    const name = extract.name(result.properties, 'Name')
    if (!name)
      throw new Error(
        `A Sprint must have a name, but missing for Sprint ${result.id}`
      )

    const match = name.match(/Sprint (?<number>[0-9]*)/)
    const stringNumber = match?.groups?.number
    if (!stringNumber)
      throw new Error(
        `A Sprint must have a name containing its number, but missing for Sprint ${result.id}`
      )
    const number = parseInt(stringNumber, 10)

    return {
      id: result.id,
      name,
      number,
      period,
    }
  }
}

export { SprintService }
