import { getPaymentByTicketId, postPayment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas/payments-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(createPaymentSchema), postPayment);

export default paymentsRouter;
