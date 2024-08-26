import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: "https://solana-actions.vercel.app/solana_devs.jpg",
    title: "Transfer SOL username",
    label: "Send me something",
    description: "Just send me some SOL for living",
    links: {
      actions: [
        {
          href: "/api/actions/products",
          label: "checkout to products",
        },
        {
          href: "/api/actions/vieworders",
          label: "check your orders",
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
