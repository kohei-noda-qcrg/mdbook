import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string().optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.db.book.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          author: input.author,
          description: input.description,
          coverImage: input.coverImage,
          content: input.content,
        },
      });
      return book.id;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        author: z.string().optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          author: input.author,
          description: input.description,
          coverImage: input.coverImage,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.book.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
