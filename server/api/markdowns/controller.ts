import { defineController } from './$relay'
import { getMarkdowns, createMarkdown } from '$/service/markdowns'

const print = (text: string) => console.log(text)

export default defineController(
  { getMarkdowns, print },
  ({ getMarkdowns, print }) => ({
    get: async ({ query }) => {
      if (query?.message) print(query.message)

      return { status: 200, body: await getMarkdowns(query?.limit) }
    },
    post: async ({ body }) => ({
      status: 201,
      body: await createMarkdown(body)
    })
  })
)
