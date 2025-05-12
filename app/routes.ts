import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout(`routes/wrapper.tsx`, [
    index(`routes/home.tsx`),
    route(`/login`, `routes/login.tsx`),
    route(`/logout`, `routes/logout.tsx`),
    layout(`routes/authenticated.tsx`, [
      route(`/dashboard`, `routes/dashboard.tsx`),
      route(`/profile`, `routes/profile.tsx`),
      ...prefix(`/admin`, [route(`/email`, `routes/admin/email.tsx`)]),
    ]),
  ]),
] satisfies RouteConfig;
