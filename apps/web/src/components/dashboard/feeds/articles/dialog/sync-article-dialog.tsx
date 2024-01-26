"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { api } from "@/trpc/react";

import { onPromise } from "../../../../../utils";
import { createFeedSchema } from "../../../../../utils/validation/schema";
import { Button } from "../../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../ui/form";
import { Input } from "../../../../ui/input";

import type { CreateFeedInput } from "../../../../../utils/validation/types";

type SyncArticleDialogProps = {
  readonly children?: React.ReactNode;
};

export const SyncArticleDialog = memo<SyncArticleDialogProps>(
  ({ children }) => {
    const form = useForm<CreateFeedInput>({
      resolver: zodResolver(createFeedSchema),
    });

    const { mutateAsync } = api.sync.queueArticleSync.useMutation({
      onSuccess: () => revalidatePath("/dashboard/syncs"),
    });

    const onSubmit = async (data: CreateFeedInput) => {
      await toast.promise(mutateAsync(data), {
        loading: "Queuing article sync...",
        success: ({ message }) => message,
        error: (err?: Error) => err?.message ?? GENERIC_ERROR_MESSAGE,
      });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="space-y-2 sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Sync any article from the web!</DialogTitle>
            <DialogDescription>
              Just pass an url and we will do the rest.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={onPromise(form.handleSubmit(onSubmit))}
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Pass url here..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button>Sync now</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

SyncArticleDialog.displayName = "SyncArticleDialog";
