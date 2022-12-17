import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

export type Methods = {
  get: {
    query?: {
      token: string
    }
    resBody: DecodedIdToken
  }
}
