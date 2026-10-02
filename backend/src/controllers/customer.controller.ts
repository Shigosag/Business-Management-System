import { Request, Response, NextFunction } from "express";
import { CustomerService, CustomerStatus } from "../services/customer.service";

const getParamId = (req: Request): string => {
  return Array.isArray(req.params.id) ? req.params.id[0] : String(req.params.id);
};

export const getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, status, page, limit } = req.query;
    const validStatus = status === "ACTIVE" || status === "INACTIVE" ? (status as CustomerStatus) : undefined;

    const result = await CustomerService.getAll({
      search: search ? String(search) : undefined,
      status: validStatus,
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
    const id = getParamId(req);
    const customer = await CustomerService.getById(id);
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
    const id = getParamId(req);
    const existing = await CustomerService.getById(id);
    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const customer = await CustomerService.update(id, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = getParamId(req);
    const existing = await CustomerService.getById(id);
    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await CustomerService.softDelete(id);
    res.json({ message: "Customer successfully archived/deleted", id });
  } catch (error) {
    next(error);
  }
};
