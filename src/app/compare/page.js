"use client";

import { Suspense } from "react";
import CompareContent from "./CompareContent";

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="p-8">Loading comparison...</p>}>
      <CompareContent />
    </Suspense>
  );
}
