import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: "https://solana-actions.vercel.app/solana_devs.jpg",
    title: "Transfer SOL 1",
    label: "Send me something",
    description: "Just send me some SOL for living",
    links: {
      actions: [
        {
          href: "/api/actions/donate?amount=0.1",
          label: "0.1 SOL",
        },
        {
          href: "/api/actions/donate?amount=0.5",
          label: "0.5 SOL",
        },
        {
          href: "/api/actions/donate?amount={amount}",
          label: "SEND SOL",
          parameters: [
            {
              name: "amount",
              label: "Enter the SOl amount",
              required: true,
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
