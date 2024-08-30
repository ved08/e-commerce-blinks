"use client";
import CreateUsername from "@/components/createusername/CreateUsername";
import { checkSellerUsername } from "@/lib/action";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const route = useRouter();

  const { publicKey, connected } = useWallet();

  const fetchUsername = async (publicKey: string) => {
    const data = await checkSellerUsername(publicKey);
    return data;
  };

  useEffect(() => {
    if (!connected && !publicKey) {
      route.push("/");
    }
  }, [connected, publicKey]);

  return (
    <div className="flex justify-center items-center h-screen">
      {publicKey && connected && (
        <CreateUsername publickey={publicKey.toString()} />
      )}
    </div>
  );
}
