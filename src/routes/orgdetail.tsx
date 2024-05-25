import { Group, Stack, Title } from "@mantine/core";
import OrgDetailCard from "../components/Cards/OrgDetailCard";
import { useLoaderData, useParams } from "react-router-dom";

function OrgDetail () {
  const params = useParams();
  console.log('OrgDetail params: ', params);

  const org = useLoaderData();

  if (org.isLoading) {
    console.log("Org detail loading...", org);
    return <div>Loading...</div>;
  }

  if (org.isError) {
    console.log("Org detail error...", org);
    return <div>Error loading org.</div>;
  }

  console.log('Org detail:', org);

  return (
    <Stack>
      <Group>
        <Title order={2}>
          Organization Detail
        </Title>
      </Group>
    </Stack>
  );
}

export default OrgDetail;