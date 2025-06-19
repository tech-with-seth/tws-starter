import type { RateLimitLog } from "@prisma/client";
import { prisma } from "~/db.server";

export type { RateLimitLog } from "@prisma/client";

export function getRateLimitLog({ id }: { id: RateLimitLog["id"] }) {
  return prisma.rateLimitLog.findUnique({ where: { id } });
}

export function getRateLimitLogs({}: {}) {
  return prisma.rateLimitLog.findMany({});
}

export function createRateLimitLog({
  data,
}: {
  data: Omit<RateLimitLog, "id">;
}) {
  return prisma.rateLimitLog.create({ data });
}

export function updateRateLimitLog({
  id,
  data,
}: {
  id: RateLimitLog["id"];
  data: Partial<Omit<RateLimitLog, "id">>;
}) {
  return prisma.rateLimitLog.update({ where: { id }, data });
}

export function deleteRateLimitLog({ id }: { id: RateLimitLog["id"] }) {
  return prisma.rateLimitLog.delete({ where: { id } });
}
