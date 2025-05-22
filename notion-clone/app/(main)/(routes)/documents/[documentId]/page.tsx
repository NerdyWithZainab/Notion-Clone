"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/app/(main)/_components/navbar";

const DocumentIdPage = () => {
  const { documentId } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const validId =
    typeof documentId === "string" ? (documentId as Id<"documents">) : null;

  const document = useQuery(
    api.documents.getById,
    validId ? { documentId: validId } : "skip"
  );
  console.log("documentId from useParams:", documentId);
  console.log("documentId:", documentId);
  console.log("documentId type:", typeof documentId);
  console.log("documentId length:", documentId?.length);

  console.log("validId:", validId);

  // Handle navbar width reset
  const handleResetWidth = () => {
    setIsCollapsed(false);
  };
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
    <div>
      <Navbar
        isCollapsed={isCollapsed}
        onResetWidth={handleResetWidth}
      ></Navbar>
      <div className="pb-40">
        <div className="h-[35vh]" />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={document} />
        </div>
      </div>
    </div>
  );
};
export default DocumentIdPage;
