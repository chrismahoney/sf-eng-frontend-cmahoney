import { Group, Stack, Title } from "@mantine/core";
import UserDetailCard from "../components/Cards/UserDetailCard";
import { useLoaderData, useParams } from "react-router-dom";

function UserDetail () {
  const params = useParams();
  console.log('UserDetail params: ', params);

  const user = useLoaderData(); 

  if (user.isLoading) {
    console.log("User detail loading...", user);
    return <div>Loading...</div>;
  }

  if (user.isError) {
    console.log("User detail error...", user);
    return <div>Error loading users.</div>;
  }

  console.log('User detail:', user);

  return (
    <Stack>
      <Group>
        <Title order={2}>
          User Detail
        </Title>
      </Group>
      <UserDetailCard
        user={user}
      />
    </Stack>
  );
}

export default UserDetail;