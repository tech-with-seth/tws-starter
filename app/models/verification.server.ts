import type { Verification } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Verification } from "@prisma/client";

// Get all verifications
export function getVerifications() {
  return prisma.verification.findMany({});
}

// Get a verification by ID
export function getVerificationById({ id }: { id: Verification["id"] }) {
  return prisma.verification.findUnique({ where: { id } });
}

// Get a verification by identifier (unique field)
export function getVerificationByIdentifier({
  identifier,
}: {
  identifier: string;
}) {
  return prisma.verification.findFirst({ where: { identifier } });
}

// Create a verification (all fields except id)
export function createVerification({
  data,
}: {
  data: Omit<Verification, "id">;
}) {
  return prisma.verification.create({ data });
}

// Update a verification by ID (partial fields)
export function updateVerification({
  id,
  data,
}: {
  id: Verification["id"];
  data: Partial<Omit<Verification, "id">>;
}) {
  return prisma.verification.update({ where: { id }, data });
}

// Delete a verification by ID
export function deleteVerificationById({ id }: { id: Verification["id"] }) {
  return prisma.verification.delete({ where: { id } });
}

// Delete a verification by identifier (unique field)
export function deleteVerificationByIdentifier({
  identifier,
}: {
  identifier: string;
}) {
  return prisma.verification.deleteMany({ where: { identifier } });
}
