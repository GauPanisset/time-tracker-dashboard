import { isFullPage } from '@notionhq/client'

import { isActivity } from '@/enums/activity'
import extract from '@/helpers/extract'
import { CacheService } from '@/services/cache'
import { NotionService } from '@/services/notion'
import type { Activity } from '@/types/activity'

/**
 * Service implementing methods relative to Activities.
 */
class ActivityService extends NotionService {
  private readonly cacheService: CacheService<Activity>

  constructor() {
    super()
    this.cacheService = new CacheService<Activity>()
  }

  /**
   * Retrieve an Activity given its id.
   * @param id activity id
   */
  public async getActivityById(id: string): Promise<Activity> {
    return this.cacheService.withCache(id, async () => {
      const response = await this.notion.pages.retrieve({ page_id: id })

      if (!isFullPage(response)) throw new Error(`Result is not a full page.`)

      const name = extract.name(response.properties, 'Name')

      if (!isActivity(name))
        throw new Error(`Unknown activity name found: ${name}`)

      return {
        id,
        name,
      }
    })
  }
}

export { ActivityService }
