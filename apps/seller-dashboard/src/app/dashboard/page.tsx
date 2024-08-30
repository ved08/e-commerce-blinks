"use client";
import React, { useEffect } from "react";
import DashboardComp from "@/components/dashboard/dashboard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, publicKey]);

  return <>{publicKey && connected && <DashboardComp />}</>;
}
