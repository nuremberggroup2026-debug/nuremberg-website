"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutComponent() {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="flex text-gray-500 focus:text-white hover:text-white cursor-pointer flex-row justify-start items-start text-sm">
    <LogOut  width={4} height={4} className="mt-1 text-gray-500 group-hover:text-cyan-500 transition-colors" />  Sign out
    </DropdownMenuItem>
  );
}
