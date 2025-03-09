import { Link, Outlet } from "react-router";
import { AppSidebar } from "~/components/AppSidebar";
import { Container } from "~/components/Container";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function WrapperRoute() {
  const isLoggedIn = true;

  return (
    <SidebarProvider defaultOpen={isLoggedIn}>
      <AppSidebar />
      <div className="grid h-screen w-full grid-cols-12 grid-rows-[auto_1fr_auto]">
        <header className="col-span-full border-b">
          <Container as="nav" className="flex justify-between p-4">
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
          </Container>
        </header>
        <main className="col-span-full flex flex-col overflow-y-auto">
          <Container className="flex-1 p-4">
            <Outlet />
          </Container>
          <footer className="col-span-full border-t">
            <Container className="p-4">
              Built by{" "}
              <a href="https://bsky.app/profile/sethdavis.tech">
                @sethdavis.tech
              </a>
            </Container>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
