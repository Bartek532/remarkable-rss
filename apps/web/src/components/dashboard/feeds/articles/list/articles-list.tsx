import { Suspense, memo } from "react";

import { supabase } from "@/lib/supabase/server";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { Empty } from "../../../../ui/empty";
import { SyncArticleDialog } from "../dialog/sync-article-dialog";

import { ArticleTile, ArticleTileSkeleton } from "./tile/article-tile";

import type { SyncArticle } from "@syncreads/database";

type ArticlesListProps = {
  readonly articles: SyncArticle[];
};

export const ArticlesList = memo<ArticlesListProps>(async ({ articles }) => {
  if (!articles.length) {
    const { data } = await supabase().auth.getUser();

    return (
      <SyncArticleDialog user={data.user}>
        <Empty
          isTrigger
          icon={<EmptyFeedsIcon />}
          title="Nothing here - for what are you waiting?"
        />
      </SyncArticleDialog>
    );
  }

  return (
    <div className="w-full flex-1 rounded-lg bg-background p-6 shadow-sm">
      <ol className="flex flex-col gap-4 sm:gap-6">
        {articles.map((article) => (
          <li key={article.syncId}>
            <Suspense fallback={<ArticleTileSkeleton />}>
              <ArticleTile url={article.url} />
            </Suspense>
          </li>
        ))}
      </ol>
    </div>
  );
});

ArticlesList.displayName = "ArticlesList";
