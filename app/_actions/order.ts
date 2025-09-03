"use server";

import db from "../_lib/prisma";
import { Prisma } from "../generated/prisma";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return await db.order.create({ data });
};
