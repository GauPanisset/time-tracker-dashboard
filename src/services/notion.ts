import { Client } from '@notionhq/client'

import type { QueryDatabaseResponse } from '@/types/notion'

const maybeNotionToken = process.env.NOTION_TOKEN
if (!maybeNotionToken)
  throw new Error(`Missing 'NOTION_TOKEN' variable in the .env file.`)
const notionToken = maybeNotionToken

/**
 * Service implementing methods relative to the Notion API.
 */
class NotionService {
  protected readonly notion: Client

  constructor() {
    this.notion = new Client({
      auth: notionToken,
    })
  }

  /**
   * Handle Notion pagination.
   * @param query query fetching a page.
   */
  public async withPagination(
    query: (startCursor: string | null) => Promise<QueryDatabaseResponse>
  ): Promise<void> {
    let hasMore = true
    let startCursor: string | null = null

    while (hasMore) {
      const response: QueryDatabaseResponse = await query(startCursor)
      if (!response.has_more) hasMore = false
      else startCursor = response.next_cursor
    }
  }
}

export { NotionService }
