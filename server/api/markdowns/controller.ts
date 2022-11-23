import { defineController } from './$relay'
import { getMarkdowns, createMarkdown } from '$/service/markdowns'

export default defineController(() => ({
  get: async () => {
    return { status: 200, body: await getMarkdowns() }
  },
  post: async ({ body }) => {
    if ('title' in body && 'content' in body) {
      const markdown = await createMarkdown(body.title, body.content)
      return { status: 201, body: markdown }
    } else {
      return { status: 400, body: 'Bad Request' }
    }
  }
}))
