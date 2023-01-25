import { getTicketsTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsTypes);

export { ticketsRouter };
