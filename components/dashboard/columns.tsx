"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "../ui/progress"

export type VM = {
  id: string
  name: string
  owner: string
  template: string
  status: "running" | "stopped" | "starting" | "stopping" | "error"
  cpuUsage: number
  memoryUsage: number
}

export const columns: ColumnDef<VM>[] = [
  { accessorKey: "name", header: "Machine Name" },
  { accessorKey: "owner", header: "Developer" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string      const variants: Record<string, string> = {
        running: "bg-green-500/10 text-green-500 hover:bg-green-500/10",
        stopped: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/10",
        starting: "bg-amber-500/10 text-amber-500 animate-pulse",
        stopping: "bg-amber-500/10 text-amber-500 animate-pulse",
        error: "bg-red-500/10 text-red-500"
      }
      return <Badge className={variants[status]}>{status}</Badge>
    }
  },
  {
    accessorKey: "cpuUsage",
    header: "Resource Usage (CPU / RAM)",
    cell: ({ row }) => {
      const cpu = row.original.cpuUsage
      const mem = row.original.memoryUsage      return (
        <div className="w-[160px] space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>CPU: {cpu}%</span>
            <span>RAM: {mem}%</span>
          </div>
          <Progress value={cpu} className={cpu > 85 ? "bg-red-200 indicator-red" : ""} />
        </div>
      )
    }
  }
]