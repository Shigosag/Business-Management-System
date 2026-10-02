import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";
import { validateRequest } from "../middleware/validate";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validations/customer.validation";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", validateRequest(createCustomerSchema), createCustomer);
router.put("/:id", validateRequest(updateCustomerSchema), updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
