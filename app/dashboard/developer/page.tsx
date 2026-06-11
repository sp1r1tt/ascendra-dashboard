"use client";

import React, { useMemo } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Terminal, Play, Square, RefreshCw, Cpu, HardDrive } from "lucide-react";

export default function DeveloperZone() {
  const { vms, startVM, stopVM, restartVM } = useAppState();
  const myVMs = useMemo(() => vms.filter((vm) => vm.ownerId === "u-01"), [vms]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">My Workspaces</h1>
        <p className="text-muted-foreground text-sm">
          Manage your isolated development environments and connect to your IDE quickly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {myVMs.map((vm) => (
          <Card key={vm.id} className="overflow-hidden border transition-all hover:shadow-sm">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-base font-mono">{vm.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{vm.region}</CardDescription>
                </div>
                <Badge
                  className={`text-[10px] uppercase font-mono tracking-wider ${
                    vm.status === "running" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10" : ""
                  }`}
                  variant={vm.status === "running" ? "default" : "secondary"}
                >
                  {vm.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {vm.status === "running" ? (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><Cpu className="h-3 w-3" /> Compute Power</span>
                      <span className="font-semibold">{vm.cpuUsagePercent}%</span>
                    </div>
                    <Progress value={vm.cpuUsagePercent} className="h-1.5" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><HardDrive className="h-3 w-3" /> Allocated Memory (RAM)</span>
                      <span className="font-semibold">{vm.memoryUsagePercent}%</span>
                    </div>
                    <Progress value={vm.memoryUsagePercent} className="h-1.5" />
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center border border-dashed rounded-md bg-muted/10">
                  <p className="text-xs text-muted-foreground">
                    This environment is stopped. Start the instance to view telemetry.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2 border-t">
                <span className="text-xs font-mono text-muted-foreground">${vm.hourlyCost.toFixed(2)}/hr</span>
                
                <div className="flex gap-1.5">
                  {vm.status === "running" && (
                    <>
                      <Button size="sm" variant="outline" className="h-8 text-xs bg-primary/5 hover:bg-primary/10 text-primary border-primary/20" onClick={() => window.open("https://vscode.dev", "_blank")}>
                        <Terminal className="h-3.5 w-3.5 mr-1.5" /> Connect
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => stopVM(vm.id)}>
                        <Square className="h-3 w-3 mr-1.5" /> Stop
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => restartVM(vm.id)}>
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </>
                  )}

                  {vm.status === "stopped" && (
                    <Button size="sm" variant="outline" className="h-8 text-xs border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10" onClick={() => startVM(vm.id)}>
                      <Play className="h-3 w-3 mr-1.5 fill-emerald-500 text-emerald-500" /> Start Environment
                    </Button>
                  )}

                  {(vm.status === "starting" || vm.status === "stopping") && (
                    <Button disabled size="sm" variant="outline" className="h-8 text-xs text-muted-foreground">
                      <RefreshCw className="h-3 w-3 mr-1.5 animate-spin text-amber-500" />
                      {vm.status === "starting" ? "Booting..." : "Tearing down..."}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
