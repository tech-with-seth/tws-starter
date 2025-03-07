import { Outlet } from "react-router";

export default function WrapperRoute() {
  return (
    <>
      <header className="border-b p-4">
        <nav className="container mx-auto">Header</nav>
      </header>
      <main>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <footer className="border-t p-4">
        <div className="container mx-auto">Footer</div>
      </footer>
    </>
  );
}
