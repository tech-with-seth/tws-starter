import { useUser } from "~/utils/common";

export default function ProfileRoute() {
  const user = useUser();
  return (
    <>
      <h1>Profile</h1>
      <ul>
        <li>{user.email}</li>
      </ul>
    </>
  );
}
