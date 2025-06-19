import type { Message } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Message } from "@prisma/client";

export function getMessage({ id }: { id: Message["id"] }) {
  return prisma.message.findUnique({ where: { id } });
}

export function getMessages({}: {}) {
  return prisma.message.findMany({});
}

export function createMessage({
  data,
}: {
  data: Omit<Message, "id" | "createdAt" | "updatedAt">;
}) {
  // Only pass fields that are allowed by Prisma's create method
  return prisma.message.create({
    data: {
      ...data,
      responseData:
        data.responseData === undefined
          ? undefined
          : (data.responseData as any),
    },
  });
}

export function updateMessage({
  id,
  data,
}: {
  id: Message["id"];
  data: Partial<Omit<Message, "id" | "createdAt" | "updatedAt">>;
}) {
  // Only pass fields that are allowed by Prisma's update method
  return prisma.message.update({
    where: { id },
    data: {
      ...data,
      responseData:
        data.responseData === undefined
          ? undefined
          : (data.responseData as any),
    },
  });
}

export function deleteMessage({ id }: { id: Message["id"] }) {
  return prisma.message.delete({ where: { id } });
}
