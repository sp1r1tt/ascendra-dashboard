"use client";

import React, { useState, useMemo } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Power, PowerOff } from "lucide-react";

export default function AdminInventory() {
  const { vms, startVM, stopVM } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVMs = useMemo(() => {
    return vms.filter((vm) => {
      const matchesSearch =
        vm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vm.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || vm.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vms, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">VM Inventory</h1>
        <p className="text-muted-foreground text-sm">
          Complete registry of the organization's virtual machines with manual lifecycle controls.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Infrastructure Overview</CardTitle>
              <CardDescription>Showing {filteredVMs.length} of {vms.length} machines</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by instance or owner..."
                  className="pl-9 text-xs h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm outline-none focus:ring-1 focus:ring-ring"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="running">Running</option>
                <option value="stopped">Stopped</option>
                <option value="starting">Starting</option>
                <option value="stopping">Stopping</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="rounded-md border border-x-0 sm:border-x">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Machine Name</TableHead>
                  <TableHead className="text-xs font-semibold">Owner</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold hidden md:table-cell">Region</TableHead>
                  <TableHead className="text-xs font-semibold hidden lg:table-cell">Metrics (CPU / RAM)</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Cost</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVMs.length > 0 ? (
                  filteredVMs.map((vm) => (
                    <TableRow key={vm.id} className="transition-colors hover:bg-muted/40">
                      <TableCell className="font-medium text-xs font-mono">{vm.name}</TableCell>
                      <TableCell className="text-xs">{vm.ownerName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={vm.status === "running" ? "default" : "secondary"}
                          className={`text-[10px] uppercase font-mono tracking-wider ${
                            vm.status === "running" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10" : ""
                          }`}
                        >
                          {vm.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell font-mono">{vm.region}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {vm.status === "running" ? (
                          <div className="flex gap-3 text-xs font-mono">
                            <span>C: {vm.cpuUsagePercent}%</span>
                            <span>M: {vm.memoryUsagePercent}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-right">${vm.hourlyCost.toFixed(2)}/hr</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          {vm.status === "stopped" && (
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-500 hover:bg-emerald-500/10" onClick={() => startVM(vm.id)}>
                              <Power className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {vm.status === "running" && (
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-amber-500 hover:bg-amber-500/10" onClick={() => stopVM(vm.id)}>
                              <PowerOff className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {(vm.status === "starting" || vm.status === "stopping") && (
                            <span className="text-[10px] text-muted-foreground animate-pulse">wait</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                      No machines match the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
