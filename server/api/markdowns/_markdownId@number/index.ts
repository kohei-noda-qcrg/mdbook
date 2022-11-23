import type { Markdown } from '@prisma/client'

export type Methods = {
  get: {
    resBody: Markdown
  }
  put: {
    reqBody: Markdown
    resBody: Markdown
  }
}
