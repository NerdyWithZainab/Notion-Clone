"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}
export const Cover = ({ url, preview }: CoverImageProps) => {
  return (
    <div
      className={cn(
        "relative w-full group",
        url ? "h-[35vh] bg-muted" : "h-[12vh]"
      )}
    >
      {url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover rounded:md"
          sizes="100vw"
        />
      )}
    </div>
  );
};
