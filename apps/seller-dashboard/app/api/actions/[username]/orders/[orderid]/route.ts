import { prisma } from "@repo/db/client";
import {
  ActionError,
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
  createActionHeaders,
  createPostResponse,
  MEMO_PROGRAM_ID,
  NextActionLink,
} from "@solana/actions";
import { getConnection } from "../../../../../lib/constants";
import {
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const headers = createActionHeaders();

export const OPTIONS = () => {
  return Response.json(
    {
      message: "",
    } as ActionError,
    {
      headers,
    }
  );
};

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
      orderid: string;
    };
  }
) => {
  try {
    console.log("inside order stats");
    console.log(req.url);
    const url = new URL(req.url);
    const body: ActionPostRequest = await req.json();
    console.log(body, params);

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        {
          message: "Invalid public key",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
    //do a db operation to fetch the order id details
    const order = await prisma.order.findUnique({
      where: {
        id: params.orderid,
      },
    });
    if (!order) {
      return Response.json(
        {
          message: "Order not present",
        } as ActionError,
        {
          headers,
        }
      );
    }

    let next: NextActionLink = {
      type: "post",
      href: "",
    };

    const connection = getConnection();

    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 5000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(JSON.stringify(params), "utf-8"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload = await createPostResponse({
      fields: {
        transaction,
        links: {
          next,
        },
      },
    });
  } catch (error) {
    return Response.json(
      {
        message: "something went wrong",
      } as ActionError,
      {
        headers,
      }
    );
  }
};
