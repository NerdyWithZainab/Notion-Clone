"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { useParams } from "next/navigation";
const DocumentIdPage = () => {
  const { documentId } = useParams();
  const document = useQuery(
    api.documents.getById,
    typeof documentId === "string"
      ? { documentId: documentId as Id<"documents"> }
      : "skip"
  );

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return (
      // Permanently deleted
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Document not found</h2>
          <p className="mt-2">It may have been permanently deleted.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};
export default DocumentIdPage;
