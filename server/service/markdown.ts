import { depend } from 'velona'
import { Markdown, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMarkdowns = depend(
  { prisma: prisma as { markdown: { findMany(): Promise<Markdown[]> } } },
  async ({ prisma }, limit?: number) =>
    (await prisma.markdown.findMany()).slice(0, limit)
)

export const getMarkdown = async (id: number) => {
  return await prisma.markdown.findUnique({
    where: {
      id: id
    }
  })
}

export const createMarkdown = async (title: string, content: string) => {
  return await prisma.markdown.create({
    data: {
      title: title,
      content: content
    }
  })
}

export const updateMarkdown = async (
  id: number,
  title: string,
  content: string
) => {
  return await prisma.markdown.update({
    where: {
      id: id
    },
    data: {
      title: title,
      content: content
    }
  })
}
