import {
  clearUrl,
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@rssmarkable/shared";

import { getSyncSchema } from "@/utils";

import { protectedProcedure, router } from "..";
import {
  getSyncHandler,
  queueArticleSyncHandler,
  queueFeedSyncHandler,
} from "../../controllers/sync.controller";

export const syncRouter = router({
  queueArticleSync: protectedProcedure
    .input(syncArticlePayloadSchema)
    .mutation(({ ctx, input }) =>
      queueArticleSyncHandler({
        ...input,
        id: ctx.session.user.id,
        url: clearUrl(input.url),
      }),
    ),
  queueFeedSync: protectedProcedure
    .input(syncFeedPayloadSchema)
    .mutation(({ ctx, input }) =>
      queueFeedSyncHandler({
        ...input,
        id: ctx.session.user.id,
      }),
    ),
  getSync: protectedProcedure
    .input(getSyncSchema)
    .query(({ input }) => getSyncHandler(input)),
});
