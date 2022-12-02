import type { Markdown } from '$prisma/client'

export type Methods = {
  patch: {
    reqBody: Partial<Pick<Markdown, 'title' | 'body' | 'completeRead'>>
    status: 204
  }
  delete: {
    status: 204
  }
  get: {
    resBody: Markdown
    status: 200
  }
}
