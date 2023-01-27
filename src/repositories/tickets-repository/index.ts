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

async function findTicketById(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function updateTicketById(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findUserTicket,
  createTicket,
  findTicketById,
  updateTicketById,
};

export default ticketsRepository;
