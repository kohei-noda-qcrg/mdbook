import { defineController } from './$relay'
import {
  updateMarkdown,
  deleteMarkdown,
  getMarkdown
} from '$/service/markdowns'

export default defineController(() => ({
  patch: async ({ body, params }) => {
    await updateMarkdown(params.markdownId, body)
    return { status: 204 }
  },
  delete: async ({ params }) => {
    await deleteMarkdown(params.markdownId)
    return { status: 204 }
  },
  get: async ({ params }) => {
    const markdown = await getMarkdown(params.markdownId)
    if (!markdown) return { status: 404 }
    return { status: 200, body: markdown }
  }
}))
