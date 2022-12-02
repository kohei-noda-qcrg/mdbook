import type { Markdown } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
      message?: string
    }

    resBody: Markdown[]
  }
  post: {
    reqBody: Pick<Markdown, 'title' | 'body'>
    resBody: Markdown
  }
}
