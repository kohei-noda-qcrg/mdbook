import type { Markdown } from '$prisma/client'

type Authtoken = {
  Bearer: string
}

export type Methods = {
  patch: {
    reqBody: Partial<Pick<Markdown, 'title' | 'body' | 'completeRead'>>
    status: 204
  }
  delete: {
    status: 204
  }
  get: {
    reqHeaders: Authtoken
    resBody: Markdown
    status: 200
  }
}
