import { Outlet } from "react-router";

export default function WrapperRoute() {
  return (
    <>
      <header className="border-b p-4">Header</header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t p-4">Footer</footer>
    </>
  );
}
