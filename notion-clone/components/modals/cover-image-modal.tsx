"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { DialogTitle } from "@radix-ui/react-dialog";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();

  return (
    <Dialog
      open={coverImage.isOpen}
      onOpenChange={(open) => {
        if (open) {
          coverImage.onOpen();
        } else {
          coverImage.onClose();
        }
      }}
    >
      <DialogContent>
        <DialogTitle>
          <DialogHeader>
            <h2 className="text-center text-lg font-semibold">Cover Image</h2>
          </DialogHeader>
          <div>TODO:Upload Image</div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
