import type { RichTextItemResponse } from '@/types/notion'

const richText = (notionRichTexts: RichTextItemResponse[]): string => {
  return notionRichTexts
    .map((maybeNotionTextRichText) => {
      if (!(maybeNotionTextRichText.type === 'text')) return ''
      return maybeNotionTextRichText.plain_text
    })
    .join()
}

/**
 * Helpers parsing Notion specific responses.
 */
const parse = { richText }

export default parse
