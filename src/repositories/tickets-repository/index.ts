import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: { Enrollment: { userId } },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(data: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data,
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findUserTicket,
  createTicket,
};

export default ticketsRepository;
