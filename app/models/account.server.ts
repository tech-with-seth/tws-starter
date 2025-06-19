import type { Account } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Account } from "@prisma/client";

// Get all accounts
export function getAccounts() {
  return prisma.account.findMany({});
}

// Get an account by ID
export function getAccountById({ id }: { id: Account["id"] }) {
  return prisma.account.findUnique({ where: { id } });
}

// Get an account by accountId and providerId (composite unique)
export function getAccountByProvider({
  accountId,
  providerId,
}: {
  accountId: string;
  providerId: string;
}) {
  return prisma.account.findFirst({ where: { accountId, providerId } });
}

// Create an account (all fields except id)
export function createAccount({ data }: { data: Omit<Account, "id"> }) {
  return prisma.account.create({ data });
}

// Update an account by ID (partial fields)
export function updateAccount({
  id,
  data,
}: {
  id: Account["id"];
  data: Partial<Omit<Account, "id">>;
}) {
  return prisma.account.update({ where: { id }, data });
}

// Delete an account by ID
export function deleteAccountById({ id }: { id: Account["id"] }) {
  return prisma.account.delete({ where: { id } });
}

// Delete an account by accountId and providerId
export function deleteAccountByProvider({
  accountId,
  providerId,
}: {
  accountId: string;
  providerId: string;
}) {
  return prisma.account.deleteMany({ where: { accountId, providerId } });
}
