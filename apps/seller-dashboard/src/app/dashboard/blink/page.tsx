"use client";
import Blink from "@/components/blink/blink";
import { CreateBlinkPage } from "@/components/blink/blinkpage";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Order() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, publicKey]);

  return (
    <div>
      <Navbar />
      {!publicKey && !connected && <Loading />}
      {publicKey && connected && (
        <CreateBlinkPage address={publicKey.toString()} />
      )}
    </div>
  );
}
