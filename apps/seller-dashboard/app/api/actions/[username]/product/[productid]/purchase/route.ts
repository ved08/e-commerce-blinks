import {
  ActionError,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { getConnection } from "../../../../../../lib/constants";

import { prisma } from "@repo/db/client";

export const OPTIONS = () => {
  return Response.json(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
      productid: string;
    };
  }
) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const address = searchParams.get("address");
    const zipcode = searchParams.get("zipcode");
    const city = searchParams.get("city");
    const amount = searchParams.get("amount");
    const state = searchParams.get("state");

    if (!name || !email || !address || !zipcode || !city || !amount || !state) {
      return Response.json(
        {
          message: "Incomeplete data",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productid,
      },
    });

    if (!product) {
      return Response.json(
        {
          message: "Product not available stop using endpoints",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    const connection = getConnection();

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: Number(product.price) * LAMPORTS_PER_SOL,
        toPubkey: new PublicKey("3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const successUrl = `/api/actions/successfull?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}&zipcode=${encodeURIComponent(zipcode)}&city=${encodeURIComponent(city)}&amount=${encodeURIComponent(amount)}&state=${encodeURIComponent(state)}&productid=${encodeURIComponent(params.productid)}`;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        links: {
          next: {
            type: "post",
            href: successUrl,
          },
        },
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    return Response.json(
      { message: "error" },
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
