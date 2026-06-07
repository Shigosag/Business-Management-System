import { prisma } from "../config/db";

export const CustomerService = {
  async getAll() {
    return prisma.customer.findMany();
  },

  async create(data: { name: string; email?: string; phone?: string }) {
    return prisma.customer.create({ data });
  },
};