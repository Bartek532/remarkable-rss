import { SyncArticleDialog } from "@/components/dashboard/feeds/dialog/sync-article-dialog";
import { Syncs } from "@/components/dashboard/syncs/syncs";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Syncs",
});

const DashboardSyncs = async () => {
  const syncs = await api.sync.getUserSyncs.query();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            You synced articles <span className="text-4xl">{syncs.length}</span>{" "}
            times!
          </h1>
          <p className="ml-1 text-sm text-muted-foreground">
            Get a quick look at how much time you saved ⌛
          </p>
        </div>
        <SyncArticleDialog>
          <Button>Sync article</Button>
        </SyncArticleDialog>
      </div>
      <Syncs syncs={syncs} />
    </div>
  );
};

export default DashboardSyncs;
