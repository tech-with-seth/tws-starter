import { Link, Outlet } from "react-router";
import { AppSidebar } from "~/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function WrapperRoute() {
  const isLoggedIn = true;

  return (
    <SidebarProvider defaultOpen={isLoggedIn}>
      <AppSidebar />
      <div className="grid h-screen w-full grid-cols-12 grid-rows-[auto_1fr_auto]">
        <header className="col-span-full border-b">
          <nav className="container mx-auto flex justify-between p-4">
            <ul className="flex items-center gap-4">
              {isLoggedIn && (
                <li>
                  <SidebarTrigger />
                </li>
              )}
              <li>
                <Link className="font-black" to="/">
                  TWS
                </Link>
              </li>
            </ul>
            <ul className="flex items-center gap-4">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="col-span-full">
          <div className="container mx-auto p-4">
            <Outlet />
          </div>
        </main>
        <footer className="col-span-full border-t">
          <div className="container mx-auto p-4">Footer</div>
        </footer>
      </div>
    </SidebarProvider>
  );
}
