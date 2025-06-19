import type { Session } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Session } from "@prisma/client";

export function getSession({ sessionToken }: { sessionToken: string }) {
  return prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });
}

export function getSessions({}: {}) {
  return prisma.session.findMany({});
}

export function getSessionById({ id }: { id: Session["id"] }) {
  return prisma.session.findUnique({ where: { id } });
}

export function getSessionByToken({ token }: { token: Session["token"] }) {
  return prisma.session.findUnique({ where: { token } });
}

export function createSession({ data }: { data: Omit<Session, "id"> }) {
  return prisma.session.create({ data });
}

export function updateSession({
  id,
  data,
}: {
  id: Session["id"];
  data: Partial<Omit<Session, "id">>;
}) {
  return prisma.session.update({ where: { id }, data });
}

export function deleteSessionById({ id }: { id: Session["id"] }) {
  return prisma.session.delete({ where: { id } });
}

export function deleteSessionByToken({ token }: { token: Session["token"] }) {
  return prisma.session.delete({ where: { token } });
}
