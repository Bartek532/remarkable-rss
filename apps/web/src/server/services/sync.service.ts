import {
  HTTP_STATUS_CODE,
  ApiError,
  isSyncApiErrorResponse,
  syncApiResponseSchema,
  type SyncArticleInput,
  type SyncFeedInput,
  isUserMetadata,
  DEFAULT_USER_METADATA,
  getSyncDefaultOptions,
} from "@syncreads/shared";

import { env } from "@/lib/env/server";
import { supabase } from "@/lib/supabase/server";
import type { GetSyncInput, GetSyncLogInput } from "@/utils";

import type { SyncOptionsInput, SyncOptionsPayload } from "@syncreads/shared";

export const queueArticleSync = async ({
  key,
  ...input
}: { key: string } & SyncArticleInput) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify(input),
  });

  const data: unknown = await response.json();

  if (isSyncApiErrorResponse(data)) {
    throw new ApiError(data.error.status, data.error.message);
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return syncApiResponseSchema.parse(data);
};

export const queueFeedSync = async ({
  key,
  ...input
}: { key: string } & SyncFeedInput) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify(input),
  });

  const data: unknown = await response.json();

  if (isSyncApiErrorResponse(data)) {
    throw new ApiError(data.error.status, data.error.message);
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return syncApiResponseSchema.parse(data);
};

export const getSyncById = async ({ id }: GetSyncInput) => {
  return supabase().from("Sync").select("*").eq("id", id).maybeSingle();
};

export const getSyncLog = async ({ syncId }: GetSyncLogInput) => {
  return supabase()
    .from("SyncLog")
    .select("*")
    .eq("syncId", syncId)
    .order("createdAt", { ascending: false });
};

export const getSyncOptions = async (
  passedOptions: SyncOptionsPayload,
): Promise<SyncOptionsInput> => {
  const { data, error } = await supabase().auth.getUser();

  if (error) {
    throw new ApiError(
      error.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }

  const metadata = isUserMetadata(data.user.user_metadata)
    ? data.user.user_metadata
    : DEFAULT_USER_METADATA;

  const defaultOptions = getSyncDefaultOptions(metadata);

  return {
    ...defaultOptions,
    ...passedOptions,
  };
};
