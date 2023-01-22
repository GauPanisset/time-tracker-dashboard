import { isFullPage } from '@notionhq/client'

import extract from '@/helpers/extract'
import { CacheService } from '@/services/cache'
import type { Sprint } from '@/types/sprint'
import { NotionService } from '@/services/notion'

/**
 * Service implementing methods relative to Sprints.
 */
class SprintService extends NotionService {
  private static DATABASE_ID = '10f1c40497b3411983f5e9bc6bd4df32'

  private readonly cacheService: CacheService<Sprint>

  constructor() {
    super()
    this.cacheService = new CacheService<Sprint>()
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

      const period = extract.period(result.properties, 'Period')

      if (!period)
        throw new Error(
          `A Sprint must have a period, but missing for Sprint ${sprintNumber}`
        )

      return {
        id: result.id,
        name:
          extract.name(result.properties, 'Name') ?? `Sprint ${sprintNumber}`,
        period,
      }
    })
  }
}

export { SprintService }
