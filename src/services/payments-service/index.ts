import { notFoundError, unauthorizedError } from "@/errors";
import { CreatePayment, Payment } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.findPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

async function postPayment(userId: number, data: CreatePayment): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(data.ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  await ticketsRepository.updateTicketById(data.ticketId);

  const paymentInfos = {
    ticketId: data.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: data.cardData.issuer,
    cardLastDigits: data.cardData.number.toString().substring(11),
  };

  const payment = await paymentsRepository.createPayment(paymentInfos);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsService;
