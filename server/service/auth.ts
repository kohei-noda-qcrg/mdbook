// import firebase-admin
import * as admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '$prisma/client'

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
  const decodedToken = await admin.auth().verifyIdToken(token)
  const user = await admin.auth().getUser(decodedToken.uid)
  console.log('decodedToken', decodedToken)
  const auth: Prisma.AuthCreateInput = {
    token,
    uid: decodedToken.uid,
    expiredAt: new Date(Date.now())
  }
  console.log('auth', auth)
  prisma.auth.create({ data: auth })
  console.log('user', user)
  return decodedToken
}
