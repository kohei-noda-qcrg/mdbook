// import firebase-admin
import * as admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '$prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

admin.initializeApp({
  credential: applicationDefault()
})

// Signup with Firebase
export const signup = async (email: string, password: string) => {
  const user = await admin.auth().createUser({ email, password })
  return user
}

// // Login with Firebase
// export const login = async (email: string, password: string) => {
//   const user = await admin.auth().signInWithEmailAndPassword(email, password)
//   const token = await admin.auth().createCustomToken(user.uid)
//   return token
// }

// Check user is authenticated
export const isAuthenticated = async (token: string) => {
  // use hash instead of token
  const decodedToken = await admin.auth().verifyIdToken(token)
  console.log('decodedToken', decodedToken)
  const user = await admin.auth().getUser(decodedToken.uid)
  console.log('user', user)
  console.log('token', token)
  const auth: Prisma.AuthCreateInput = {
    token,
    uid: user.uid,
    expiredAt: new Date(Date.now())
  }
  prisma.auth.create({ data: auth }).catch((e) => console.log(e))
}
