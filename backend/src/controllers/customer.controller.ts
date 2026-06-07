import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export const getCustomers = async (_: Request, res: Response) => {
  const data = await CustomerService.getAll();
  res.json(data);
};

export const createCustomer = async (req: Request, res: Response) => {
  const customer = await CustomerService.create(req.body);
  res.status(201).json(customer);
};