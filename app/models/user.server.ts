import type { User } from "@prisma/client";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

// Get all users
export function getUsers() {
  return prisma.user.findMany({});
}

// Get a user by ID
export function getUserById({ id }: { id: User["id"] }) {
  return prisma.user.findUnique({ where: { id } });
}

// Get a user by email (unique field)
export function getUserByEmail({ email }: { email: string }) {
  return prisma.user.findUnique({ where: { email } });
}

// Create a user (all fields except id)
export function createUser({ data }: { data: Omit<User, "id"> }) {
  return prisma.user.create({ data });
}

// Update a user by ID (partial fields)
export function updateUser({
  id,
  data,
}: {
  id: User["id"];
  data: Partial<Omit<User, "id">>;
}) {
  return prisma.user.update({ where: { id }, data });
}

// Delete a user by ID
export function deleteUserById({ id }: { id: User["id"] }) {
  return prisma.user.delete({ where: { id } });
}

// Delete a user by email (unique field)
export function deleteUserByEmail({ email }: { email: string }) {
  return prisma.user.delete({ where: { email } });
}
