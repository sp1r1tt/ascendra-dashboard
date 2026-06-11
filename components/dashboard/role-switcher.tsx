"use client";

import { useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, ShieldCheck } from "lucide-react";

export function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();  const currentRole = pathname.includes("/dashboard/admin") ? "admin" : "developer";

  const handleRoleChange = (role: string) => {
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/developer");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px] h-9 text-xs font-medium">
          <SelectValue placeholder="Select context" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="developer">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Developer View</span>
            </div>
          </SelectItem>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>DevOps Admin View</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}