import { isFullPage } from '@notionhq/client'

import extract from '@/helpers/extract'
import { CacheService } from '@/services/cache'
import { NotionService } from '@/services/notion'
import type { Project } from '@/types/project'

/**
 * Service implementing methods relative to Projects.
 */
class ProjectService extends NotionService {
  private readonly cacheService: CacheService<Project>

  constructor() {
    super()
    this.cacheService = new CacheService<Project>()
  }

  /**
   * Retrieve a Project given its id.
   * @param id activity id
   */
  public async getProjectById(id: string): Promise<Project> {
    return this.cacheService.withCache(id, async () => {
      const response = await this.notion.pages.retrieve({ page_id: id })

      if (!isFullPage(response)) throw new Error(`Result is not a full page.`)

      const name = extract.name(response.properties, 'Name')

      if (!name)
        throw new Error(`A Project must have a name, but missing for id: ${id}`)

      return {
        id,
        name,
        status: extract.status(response.properties, 'Status'),
        storyPoints: extract.number(response.properties, 'SP'),
      }
    })
  }
}

export { ProjectService }
