"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const restore = useMutation(api.documents.restore);

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash</p>
      <Button
        size="sm"
        onClick={onRestore}
        className="border border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal "
      >
        Restore Page
      </Button>
      <DeleteForeverButton documentId={documentId} />
    </div>
  );
};

interface DeleteForeverButtonProps {
  documentId: Id<"documents">;
}

export const DeleteForeverButton = ({
  documentId,
}: DeleteForeverButtonProps) => {
  const deleteForever = useMutation(api.documents.deleteForever);

  const onDelete = () => {
    const promise = deleteForever({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting forever...",
      success: "Note permanently deleted.",
      error: "Failed to delete note.",
    });
  };

  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button
        size="sm"
        className="border border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Delete Forever
      </Button>
    </ConfirmModal>
  );
};
