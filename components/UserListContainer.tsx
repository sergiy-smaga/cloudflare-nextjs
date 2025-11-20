import { getUsersAsync } from "../lib/user";
import UserList from "./UserList";

export default async function UserListContainer() {
  const users = await getUsersAsync();
  return <UserList users={users} />;
}
