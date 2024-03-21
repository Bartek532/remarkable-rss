"use client";

import { SyncStatus, type Log } from "@rssmarkable/database";
import dayjs from "dayjs";
import { marked } from "marked";
import { useParams, useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SYNC_LOG_LEVEL_COLORS } from "@/config/sync";
import { useRealtimeLog, useRealtimeSync } from "@/hooks/useRealtime";
import { cn } from "@/utils";

import type { Sync } from "@rssmarkable/database";
import type { LogMessage } from "@rssmarkable/shared";

type SyncLogProps = {
  readonly log: Log & { json: LogMessage[] };
  readonly sync: Sync;
};

export const SyncLog = memo<SyncLogProps>(({ log, sync }) => {
  const [activeLine, setActiveLine] = useState("");
  const linesTableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();
  const params = useParams();
  const realtimeSync = useRealtimeSync({
    id: sync.id,
    initial: sync,
  });
  const realtimeLog = useRealtimeLog({
    syncId: log.syncId,
    initial: log,
    onPayload: () =>
      linesTableRef.current?.scrollIntoView({
        block: "end",
      }),
  });

  useEffect(() => {
    const arr = window.location.hash.match(/#L\d+/g);
    if (arr) {
      setActiveLine(arr[0]);
      document.getElementById(arr[0])?.scrollIntoView();
    }
  }, [params]);

  return (
    <div
      className="-mx-6 overflow-hidden overflow-x-auto border bg-background py-4 shadow-sm sm:mx-0 sm:rounded-lg"
      ref={linesTableRef}
    >
      <table className="min-w-full">
        <tbody>
          {realtimeLog?.json.map(({ date, message, level }, index) => (
            <tr
              key={date.toString()}
              className={cn(
                "text-sm sm:text-base",
                SYNC_LOG_LEVEL_COLORS[level],
                activeLine === `#L${index + 1}` &&
                  "bg-picked text-picked-foreground hover:bg-picked/60",
              )}
            >
              <td
                className="w-0 cursor-pointer px-4 py-1 align-top sm:px-7 sm:py-1.5"
                aria-hidden="true"
                onClick={() => router.push(`#L${index + 1}`)}
              >
                <span className="hidden sm:inline">
                  {dayjs(date).format("HH:mm:ss.SSS")}
                </span>
                <span className="inline sm:hidden">
                  {dayjs(date).format("HH:mm:ss")}
                </span>
              </td>
              <td className="py-1 pr-4 sm:py-1.5 sm:pr-6">
                <span
                  dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
                  className="markdown"
                ></span>
              </td>
            </tr>
          ))}

          {realtimeSync?.status !== SyncStatus.SUCCESS &&
            realtimeSync?.status !== SyncStatus.FAILED && (
              <tr>
                <td className="px-4 pt-1.5 sm:px-7 sm:pt-2">
                  <Skeleton className="h-5 w-full bg-muted-foreground/30" />
                </td>
                <td>
                  <div className="mt-2 flex w-full justify-start gap-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30 [animation-delay:-0.3s]"></div>
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30 [animation-delay:-0.15s]"></div>
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground/30"></div>
                  </div>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
});

SyncLog.displayName = "SyncLog";
