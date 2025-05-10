import { useUser } from "~/utils/common";
import { SITE_TITLE } from "~/utils/site-config";

export function meta() {
  return [{ title: `${SITE_TITLE} | Profile` }];
}

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
