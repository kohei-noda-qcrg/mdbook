import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Markdown, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const getMarkdowns = depend(
  { prisma: prisma as { markdown: { findMany(): Promise<Markdown[]> } } },
  async ({ prisma }, limit?: number) =>
    (await prisma.markdown.findMany()).slice(0, limit)
)

export const getMarkdown = (id: number) =>
  prisma.markdown.findUnique({ where: { id } })

export const createMarkdown = (partialMarkdown: Prisma.MarkdownCreateInput) =>
  prisma.markdown.create({ data: partialMarkdown })

export const updateMarkdown = (
  id: Markdown['id'],
  partialMarkdown: Prisma.MarkdownUpdateInput
) => prisma.markdown.update({ where: { id }, data: partialMarkdown })

export const deleteMarkdown = (id: Markdown['id']) =>
  prisma.markdown.delete({ where: { id } })
