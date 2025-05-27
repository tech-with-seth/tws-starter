import { Link, NavLink, Outlet } from "react-router";
import { SITE_TITLE } from "~/utils/site-config";

export default function WrapperRoute() {
  return (
    <>
      <div className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
        <header className="col-span-full border-b">
          <ul className="flex items-center">
            <li>
              <Link to="/" className="inline-block p-4 dark:hover:bg-zinc-800">
                {SITE_TITLE}
              </Link>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `inline-block p-4 dark:hover:bg-zinc-800 ${isActive ? "bg-zinc-200 dark:bg-zinc-700" : ""}`
                }
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `inline-block p-4 dark:hover:bg-zinc-800 ${isActive ? "bg-zinc-200 dark:bg-zinc-700" : ""}`
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </header>
        <main className="col-span-full flex flex-col overflow-y-auto">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <footer className="col-span-full border-t p-4">
            Built by{" "}
            <a href="https://bsky.app/profile/sethdavis.tech">
              @sethdavis.tech
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
