import { getMarkdown, updateMarkdown } from '$/service/markdowns'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params: { markdownId } }) => {
    const markdown = await getMarkdown(markdownId)
    if (!markdown) return { status: 404 as const }
    return { status: 200, body: markdown }
  },
  put: async ({ body: { id, title, content, complete } }) => {
    if (!id || !title || !content) return { status: 400 as const }
    const markdown = await updateMarkdown(id, title, content, complete)
    if (!markdown) return { status: 404 as const }
    return { status: 200, body: markdown }
  }
}))
