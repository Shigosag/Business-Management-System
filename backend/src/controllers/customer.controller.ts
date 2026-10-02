import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer.service";
import { CustomerStatus } from "@prisma/client";

export const getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, status, page, limit } = req.query;
    const result = await CustomerService.getAll({
      search: search ? String(search) : undefined,
      status: status && Object.values(CustomerStatus).includes(status as CustomerStatus)
        ? (status as CustomerStatus)
        : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 50,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const customer = await CustomerService.getById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const customer = await CustomerService.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await CustomerService.getById(req.params.id);
    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const customer = await CustomerService.update(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await CustomerService.getById(req.params.id);
    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await CustomerService.softDelete(req.params.id);
    res.json({ message: "Customer successfully archived/deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
