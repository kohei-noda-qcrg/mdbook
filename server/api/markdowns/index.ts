import { Markdown } from '@prisma/client'

export type Methods = {
  get: {
    resBody: Markdown[]
  }
  post: {
    reqBody: Pick<Markdown, 'title' | 'content'>
    resBody: Markdown
  }
}
