"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const update = useMutation(api.documents.update);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };
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
        <DialogHeader>
          <DialogTitle>Cover Image</DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
