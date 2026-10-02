import { prisma } from "../config/db";
import { CustomerStatus } from "@prisma/client";

interface CustomerQueryOptions {
  search?: string;
  status?: CustomerStatus;
  page?: number;
  limit?: number;
}

export const CustomerService = {
  async getAll(options: CustomerQueryOptions = {}) {
    const { search, status, page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    if (search && search.trim() !== "") {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  async getById(id: string) {
    return prisma.customer.findFirst({
      where: { id, deletedAt: null },
    });
  },

  async create(data: { name: string; email?: string; phone?: string }) {
    return prisma.customer.create({
      data: {
        name: data.name,
        email: data.email && data.email.trim() !== "" ? data.email : null,
        phone: data.phone && data.phone.trim() !== "" ? data.phone : null,
      },
    });
  },

  async update(id: string, data: { name?: string; email?: string; phone?: string; status?: CustomerStatus }) {
    return prisma.customer.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email.trim() !== "" ? data.email : null }),
        ...(data.phone !== undefined && { phone: data.phone.trim() !== "" ? data.phone : null }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
  },

  async softDelete(id: string) {
    return prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), status: CustomerStatus.INACTIVE },
    });
  },
};
