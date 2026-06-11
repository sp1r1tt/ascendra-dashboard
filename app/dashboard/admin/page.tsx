"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Fleet Metrics & Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Global infrastructure state, core cluster node utilization, and FinOps forecasting.
        </p>
      </div>      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total VMs Running" 
          value="42 / 56" 
          description="8 idling nodes suspended automatically" 
          trend="neutral" 
        />
        <MetricCard 
          title="Avg CPU Utilization" 
          value="64.2%" 
          description="+4.3% spike within the last hour" 
          trend="up" 
        />
        <MetricCard 
          title="Avg Memory Usage" 
          value="78.1%" 
          description="-1.2% drop after scale-down action" 
          trend="down" 
        />
        <MetricCard 
          title="Est. Infrastructure Cost" 
          value="$1,420" 
          description="Current month projection active" 
          trend="up" 
        />
      </div>      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Cluster Telemetry Feed</span>
            </CardTitle>
            <CardDescription>
              Detailed real-time data visualizations will load here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border border-dashed rounded-md m-6 mt-2">
            <p className="text-sm text-muted-foreground animate-pulse">
              Ready to attach Recharts telemetry component...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}