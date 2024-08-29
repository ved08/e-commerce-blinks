import { clusterApiUrl, Connection } from "@solana/web3.js";

export const getConnection = () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  return connection;
};
