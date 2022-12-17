import { defineController } from './$relay'
import { isAuthenticated } from '$/service/auth'

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await isAuthenticated(query?.token || '')
  })
}))
