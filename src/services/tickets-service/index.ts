import { notFoundError } from "@/errors";
import { TicketReturn } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType, Ticket } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketsRepository.findTicketsTypes();

  if (!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function getUserTicket(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findUserTicket(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number): Promise<TicketReturn> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const enrollmentId = enrollment.id;

  const status = "RESERVED";

  const ticket = await ticketsRepository.createTicket({ ticketTypeId, enrollmentId, status });

  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketsTypes,
  getUserTicket,
  postTicket,
};

export default ticketsService;
