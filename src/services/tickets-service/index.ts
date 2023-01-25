import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketsRepository.findTicketsTypes();

  if (!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

const ticketsService = {
  getTicketsTypes,
};

export default ticketsService;
