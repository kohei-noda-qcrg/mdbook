import { defineController } from './$relay'
import { getMarkdowns, createMarkdown } from '$/service/markdown'

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => {
    if (body.title && body.content) {
      const markdown = await createMarkdown(body.title, body.content)
      return { status: 201, body: markdown }
    } else {
      return { status: 400, body: 'Bad Request' }
    }
  }
}))
