import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(data: Prisma.PaymentUncheckedCreateInput) {
  return prisma.payment.create({
    data,
  });
}

const paymentsRepository = {
  findPayment,
  createPayment,
};

export default paymentsRepository;
