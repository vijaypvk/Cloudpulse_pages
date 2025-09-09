"use client";

import { Suspense } from "react";
import CloudflareDeploymentDashboard from "./deployment";

export default function DeploymentPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading deployment dashboard...</div>}>
      <CloudflareDeploymentDashboard />
    </Suspense>
  );
}
