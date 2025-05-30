import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout(`routes/wrapper.tsx`, [
    // Static routes
    index(`routes/home.tsx`),
    route(`about`, `routes/about.tsx`),
    // Auth routes
    route(`sign-in`, `routes/signin.tsx`),
    route(`sign-up`, `routes/signup.tsx`),
    route(`sign-out`, `routes/signout.ts`),
    // Callback routes
    route(`success`, `routes/success.tsx`),
    // Protected routes
    layout(`routes/authenticated.tsx`, [
      route(`dashboard`, `routes/dashboard.tsx`),
      route(`profile`, `routes/profile.tsx`),
      // Polar routes
      route(`checkout`, `routes/polar/checkout.ts`),
      route(`portal`, `routes/polar/portal.ts`),
      // Admin routes
      ...prefix(`admin`, [
        route(`ai`, `routes/admin/ai.tsx`),
        route(`biz`, `routes/admin/business.tsx`),
        route(`email`, `routes/admin/email.tsx`),
      ]),
    ]),
    // API routes
    ...prefix(`api`, [route(`auth/*`, `routes/api/auth.ts`)]),
  ]),
] satisfies RouteConfig;
