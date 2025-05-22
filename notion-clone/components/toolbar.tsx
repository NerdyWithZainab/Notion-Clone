"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Title } from "@/app/(main)/_components/title";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const update = useMutation(api.documents.update);

  const handleIconChange = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };
  return (
    <div className="pl-[54px] group relative">
      {!preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={handleIconChange}>
            <p className="text-6xl hover-opacity-75 transition">
              {initialData.icon || "📄"}
            </p>
          </IconPicker>
          <Title initialData={initialData} />
        </div>
      )}
    </div>
  );
};
