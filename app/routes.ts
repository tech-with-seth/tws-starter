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
    route(`about`, `routes/about.tsx`),
    route(`sign-in`, `routes/signin.tsx`),
    route(`sign-up`, `routes/signup.tsx`),
    route(`sign-out`, `routes/signout.ts`),
    layout(`routes/authenticated.tsx`, [
      route(`dashboard`, `routes/dashboard.tsx`),
      route(`profile`, `routes/profile.tsx`),
      ...prefix(`admin`, [
        route(`email`, `routes/admin/email.tsx`),
        route(`ai`, `routes/admin/ai.tsx`),
      ]),
    ]),
    ...prefix(`api`, [route(`auth/*`, `routes/api/auth.ts`)]),
  ]),
] satisfies RouteConfig;
