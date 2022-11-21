import {Markdown} from '@prisma/client'

export type Methods = {
  get: {
    resBody: string
  },
  post: {
    reqBody: Pick<Markdown, 'title' | 'content'>
    resBody: Markdown
  }
}
