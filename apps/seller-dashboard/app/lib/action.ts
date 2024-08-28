"use server";

import { prisma } from "@repo/db/client";
import {
  ProductInput,
  SellerBlinkInput,
  SellerInput,
  UserInput,
} from "./validation";

export const createSllerProduct = async (
  sellerWalet: string,
  productData: ProductInput
) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerWalet,
      },
    });

    if (!seller) {
      return {
        message: "seller not present cant add the product",
      };
    }

    let product = await prisma.product.create({
      data: {
        ...productData,
        sellerId: seller.id,
      },
    });

    return {
      msg: "product created sucessfully",
      product,
      err: false,
    };
  } catch (error) {
    return {
      msg: "something went wrong while creating product",
      err: true,
    };
  }
};

export const createSeller = async (sellerData: SellerInput) => {
  try {
    const sellerExists = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerData.walletAddress,
      },
    });

    if (sellerExists) return { msg: "already exits" };

    const seller = await prisma.seller.create({
      data: sellerData,
    });

    return {
      msg: "Account created successfully",
      seller,
      err: false,
    };
  } catch (error) {
    return {
      msg: "something went wrong while creting seller account",
      err: true,
    };
  }
};

export const doNothing = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("inside server action");
    return { msg: "hello" };
  } catch (error) {
    return { msg: "error", err: true };
  }
};

export const createUser = async (userData: UserInput) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userWallet: userData.walletAddress,
      },
    });
    if (user) {
      return {
        msg: "user already present",
        err: true,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        emailAddress: userData.emailAddress,
        userWallet: userData.walletAddress,
        name: userData.name,
      },
    });

    return {
      msg: "User created successfully",
      err: false,
      newUser,
    };
  } catch (error) {
    return {
      msg: "error",
      err: true,
    };
  }
};

export const createSellerBlink = async (sellerBlinkData: SellerBlinkInput) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerBlinkData.sellerWallet,
      },
    });

    if (!seller) return { msg: "first create a seller account", err: true };

    if (seller.blinkCreated) {
      return {
        msg: "You've already created your blink go and update",
        err: true,
      };
    }

    const sellerBlink = await prisma.sellerBlink.create({
      data: sellerBlinkData,
    });

    await prisma.seller.update({
      where: {
        walletAddress: seller.walletAddress,
      },
      data: {
        blinkCreated: true,
      },
    });

    return {
      msg: "Created blink for the user",
      data: sellerBlink,
      err: false,
    };
  } catch (error) {
    return { msg: "something went wrong while creating blink", err: true };
  }
};

export const createPurchaseTransaction = async () => {};
