import { useLoaderData, useParams } from "react-router-dom";
import UserDetailCard from "../components/Cards/UserDetailCard";

function UserDetail () {
  const user = useLoaderData(); 

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>Error loading users.</div>;
  }

  console.log('User detail:', user);

  return (
    <UserDetailCard
      user={user}
    />
  );
}

export default UserDetail;