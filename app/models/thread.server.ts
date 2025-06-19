import type { Thread } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Thread } from "@prisma/client";

export function getThread({ id }: { id: Thread["id"] }) {
  return prisma.thread.findUnique({ where: { id } });
}

export function getThreads({}: {}) {
  return prisma.thread.findMany({});
}

export function createThread({
  data,
}: {
  data: Omit<Thread, "id" | "createdAt" | "updatedAt">;
}) {
  return prisma.thread.create({ data });
}

export function updateThread({
  id,
  data,
}: {
  id: Thread["id"];
  data: Partial<Omit<Thread, "id" | "createdAt" | "updatedAt">>;
}) {
  return prisma.thread.update({ where: { id }, data });
}

export function deleteThread({ id }: { id: Thread["id"] }) {
  return prisma.thread.delete({ where: { id } });
}
