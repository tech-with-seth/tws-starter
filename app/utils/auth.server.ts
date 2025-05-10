import { Authenticator } from "remix-auth";
import { createCookieSessionStorage } from "react-router";

import type { User } from "@prisma/client";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["180f6f12-3093-5d4d-9065-e26a37f9de8e"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<User>();
