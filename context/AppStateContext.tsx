"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type VMStatus = "running" | "stopped" | "starting" | "stopping" | "error";export interface VM {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  templateId: string;
  status: VMStatus;
  region: string;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  diskUsagePercent: number;
  hourlyCost: number;
}

export interface VMTemplate {
  id: string;
  name: string;
  vCpu: number;
  memoryGb: number;
  diskSizeGb: number;
  baseImage: string;
}

interface AppContextType {
  vms: VM[];
  templates: VMTemplate[];
  startVM: (id: string) => void;
  stopVM: (id: string) => void;
  restartVM: (id: string) => void;
  addTemplate: (template: Omit<VMTemplate, "id">) => void;
}

const AppStateContext = createContext<AppContextType | undefined>(undefined);

const initialTemplates: VMTemplate[] = [
  { id: "t1", name: "General Small", vCpu: 2, memoryGb: 8, diskSizeGb: 50, baseImage: "ubuntu-22.04" },
  { id: "t2", name: "Compute Large", vCpu: 8, memoryGb: 32, diskSizeGb: 150, baseImage: "ubuntu-22.04" },
];const initialVMs: VM[] = [
  { 
    id: "vm-1", 
    name: "api-service-dev", 
    ownerId: "u-01",
    ownerName: "Alex Kovalenko", 
    templateId: "t2", 
    status: "running", 
    region: "eu-central-1", 
    cpuUsagePercent: 42, 
    memoryUsagePercent: 68, 
    diskUsagePercent: 35, 
    hourlyCost: 0.45 
  },
  { 
    id: "vm-2", 
    name: "frontend-sandbox", 
    ownerId: "u-01",
    ownerName: "Alex Kovalenko", 
    templateId: "t1", 
    status: "stopped", 
    region: "us-east-1", 
    cpuUsagePercent: 0, 
    memoryUsagePercent: 0, 
    diskUsagePercent: 12, 
    hourlyCost: 0.15 
  },
  { 
    id: "vm-3", 
    name: "data-cruncher-9000", 
    ownerId: "u-02", 
    ownerName: "Dmitry S.", 
    templateId: "t2", 
    status: "running", 
    region: "us-west-2", 
    cpuUsagePercent: 2, 
    memoryUsagePercent: 92, 
    diskUsagePercent: 88, 
    hourlyCost: 0.45 
  },
];

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [vms, setVms] = useState<VM[]>(initialVMs);
  const [templates, setTemplates] = useState<VMTemplate[]>(initialTemplates);

  useEffect(() => {
    const interval = setInterval(() => {
      setVms((prev) =>
        prev.map((vm) => {
          if (vm.status !== "running") return vm;
          return {
            ...vm,
            cpuUsagePercent: Math.max(2, Math.min(98, vm.cpuUsagePercent + (Math.random() * 10 - 5))),
            memoryUsagePercent: Math.max(10, Math.min(95, vm.memoryUsagePercent + (Math.random() * 4 - 2))),
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startVM = (id: string) => {
    setVms((prev) => prev.map((vm) => (vm.id === id ? { ...vm, status: "starting" } : vm)));
    setTimeout(() => {
      setVms((prev) => prev.map((vm) => (vm.id === id ? { ...vm, status: "running", cpuUsagePercent: 15, memoryUsagePercent: 30 } : vm)));
    }, 2500);
  };

  const stopVM = (id: string) => {
    setVms((prev) => prev.map((vm) => (vm.id === id ? { ...vm, status: "stopping" } : vm)));
    setTimeout(() => {
      setVms((prev) => prev.map((vm) => (vm.id === id ? { ...vm, status: "stopped", cpuUsagePercent: 0, memoryUsagePercent: 0 } : vm)));
    }, 2500);
  };

  const restartVM = (id: string) => {
    stopVM(id);
    setTimeout(() => startVM(id), 2600);
  };

  const addTemplate = (newT: Omit<VMTemplate, "id">) => {
    setTemplates((prev) => [...prev, { ...newT, id: `t-${Date.now()}` }]);
  };

  return (
    <AppStateContext.Provider value={{ vms, templates, startVM, stopVM, restartVM, addTemplate }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within an AppStateProvider");
  return context;
}