import { depend } from 'velona'
import { Markdown, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMarkdowns = depend(
  { prisma: prisma as { markdown: { findMany(): Promise<Markdown[]> } } },
  async ({ prisma }) => await prisma.markdown.findMany()
)

export const getMarkdown = async (id: Markdown['id']) => {
  return await prisma.markdown.findUnique({
    where: {
      id: id
    }
  })
}

export const createMarkdown = async (
  title: Markdown['title'],
  content: Markdown['content']
) => {
  return await prisma.markdown.create({
    data: {
      title: title,
      content: content
    }
  })
}

export const updateMarkdown = async (
  id: Markdown['id'],
  title: Markdown['title'],
  content: Markdown['content']
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
