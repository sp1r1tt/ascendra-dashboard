"use client";

import { useAppState } from "@/context/AppStateContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  Layers, 
  Activity, 
  DollarSign, 
  Play, 
  Square, 
  RefreshCw, 
  AlertTriangle,
  ArrowUpRight,
  Terminal
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { vms, startVM, stopVM, restartVM } = useAppState();  const totalVMs = vms.length;
  const activeVMs = vms.filter((vm) => vm.status === "running").length;
  
  const totalHourlyCost = vms
    .filter((vm) => vm.status === "running")
    .reduce((sum, vm) => sum + vm.hourlyCost, 0);  const runningVMs = vms.filter((vm) => vm.status === "running");
  const avgCpu = runningVMs.length 
    ? Math.round(runningVMs.reduce((sum, vm) => sum + vm.cpuUsagePercent, 0) / runningVMs.length)
    : 0;
  const avgRam = runningVMs.length 
    ? Math.round(runningVMs.reduce((sum, vm) => sum + vm.memoryUsagePercent, 0) / runningVMs.length)
    : 0;  const underutilizedVMs = vms.filter(
    (vm) => vm.status === "running" && vm.cpuUsagePercent < 10
  );

  return (
    <div className="space-y-6">      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">System Infrastructure</h1>
        <p className="text-muted-foreground text-sm">
          Real-time cluster metrics, automated orchestration analytics, and active execution nodes.
        </p>
      </div>      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Workspaces</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeVMs} <span className="text-sm font-normal text-muted-foreground">/ {totalVMs} Active</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Orchestrated environment nodes</p>
          </CardContent>
        </Card>        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Cluster CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCpu}%</div>
            <Progress value={avgCpu} className="h-2 mt-2" />
          </CardContent>
        </Card>        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Memory Load</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRam}%</div>
            <Progress value={avgRam} className="h-2 mt-2" />
          </CardContent>
        </Card>        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Burn Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalHourlyCost.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/hr</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on compute instances running</p>
          </CardContent>
        </Card>
      </div>      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Active Computing Fleet</CardTitle>
            <CardDescription>Live telemetry data feed and core runtime execution controls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vms.map((vm) => (
              <div key={vm.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4 transition-all hover:bg-muted/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm tracking-tight">{vm.name}</span>
                    <Badge 
                      variant={
                        vm.status === "running" ? "default" : 
                        vm.status === "stopped" ? "secondary" : "outline"
                      }
                      className={
                        vm.status === "running" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-emerald-500/20" :
                        vm.status === "error" ? "bg-destructive/10 text-destructive border-destructive/20" :
                        vm.status === "starting" || vm.status === "stopping" ? "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse" : ""
                      }
                    >
                      {vm.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Owner: {vm.ownerName}</p>                  {vm.status === "running" && (
                    <div className="flex gap-4 text-xs text-muted-foreground pt-1">
                      <span>CPU: <strong className="text-foreground font-mono font-medium">{vm.cpuUsagePercent}%</strong></span>
                      <span>RAM: <strong className="text-foreground font-mono font-medium">{vm.memoryUsagePercent}%</strong></span>
                    </div>
                  )}
                </div>                <div className="flex items-center gap-1.5 self-end sm:self-center">                  {vm.status === "running" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 gap-1.5 text-xs bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary transition-all"
                      onClick={() => window.open("https://vscode.dev", "_blank")}
                    >
                      <Terminal className="h-3.5 w-3.5" />
                      <span>Connect</span>
                    </Button>
                  )}                  {vm.status === "stopped" && (
                    <Button size="sm" variant="outline" className="h-8 gap-1 text-xs" onClick={() => startVM(vm.id)}>
                      <Play className="h-3 w-3 text-emerald-500 fill-emerald-500" /> Start
                    </Button>
                  )}                  {vm.status === "running" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 gap-1 text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors" 
                        onClick={() => stopVM(vm.id)}
                      >
                        <Square className="h-3 w-3 text-amber-500 fill-amber-500" /> Stop
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-2" title="Hard Restart" onClick={() => restartVM(vm.id)}>
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </>
                  )}                  {(vm.status === "starting" || vm.status === "stopping") && (
                    <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs text-muted-foreground bg-muted/50" disabled>
                      <RefreshCw className="h-3 w-3 animate-spin text-amber-500" /> 
                      <span>{vm.status === "starting" ? "Booting..." : "Tearing down..."}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>FinOps Optimizer</CardTitle>
            <CardDescription>Automated cost and allocation optimization strategies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">            {underutilizedVMs.length > 0 ? (
              underutilizedVMs.map((vm) => (
                <div key={vm.id} className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-semibold">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Idling Instance Detected</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The machine <strong className="text-foreground">{vm.name}</strong> is generating unneeded costs with a minimal CPU workload (<strong className="text-foreground">{vm.cpuUsagePercent}%</strong>). Shutting down this instance could reclaim up to <strong className="text-foreground">${(vm.hourlyCost * 24 * 30).toFixed(0)}/mo</strong>.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full text-xs h-8 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white" 
                    onClick={() => stopVM(vm.id)}
                  >
                    Suspend Instance
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-lg p-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full mb-2">
                  <DollarSign className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium tracking-tight">Resource Management Optimal</span>
                <p className="text-xs text-muted-foreground max-w-[220px] mt-1">
                  All running virtual instances are actively processing tasks. No idling nodes found.
                </p>
              </div>
            )}            <div className="p-4 border rounded-lg space-y-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Quick Shortcuts
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/dashboard/admin/inventory" className="w-full">
                  <Button variant="outline" className="w-full text-xs h-8 justify-between px-2.5">
                    <span>Full Inventory</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/dashboard/developer" className="w-full">
                  <Button variant="outline" className="w-full text-xs h-8 justify-between px-2.5">
                    <span>My Workspace</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </Link>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}