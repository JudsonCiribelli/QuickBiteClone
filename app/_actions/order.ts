"use server";

import { revalidatePath } from "next/cache";
import db from "../_lib/prisma";
import { Prisma } from "../generated/prisma";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};
