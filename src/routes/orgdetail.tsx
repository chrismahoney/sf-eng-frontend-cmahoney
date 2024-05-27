import { useLoaderData } from "react-router-dom";
import { Avatar, Title, Text, Grid, Paper, Stack, Group, SimpleGrid, Flex } from '@mantine/core';
import D3VisualizerBase from '../components/Charting/Visualizers/D3VisualizerBase';

function OrgDetail () {
  const org = useLoaderData(); 

  if (org.isLoading) {
    return <div>Loading...</div>;
  }

  if (org.isError) {
    return <div>Error loading orgs.</div>;
  }

  const roleData = org.roles?.map((role) => {
    return {
      name: role,
      label: role,
      value: 1,
      children: org.matches
        .filter((match) => {
          return match.role === role;
        }).map((match) => {
          return {
            name: match.user_id,
            label: match.user_id,
            value: 1,
          }
        })
    }
  });

  const matchData = org.matches?.map((match) => {
    return {
      name: `${match.role} (${match.match_level}%)`,
      label: match.role,
      value: 100.0/org.matches.length-1
    }
  });

  const data = {
    name: `${org.org_name}`,
    children: roleData
  };

  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={2}>
          {org.org_name}
        </Title>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6 }}>
        <Paper mih={150} shadow="sm" radius="sm" withBorder p="sm" bg="var(--mantine-color-body)">
          <Stack gap="xs">
            <Title order={4}>Roles</Title>
            {org.roles.length > 0 ? (
              <Title order={1}
                style={{
                  fontWeight: 200
                }}
              >{org.matches.length}</Title>
            ) : (
              <Title order={1}
                style={{
                  fontWeight: 200,
                  fontStyle: 'italic'
                }}
              >N/A</Title>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6 }}>
        <Paper mih={150} shadow="sm" radius="sm" withBorder p="sm" bg="var(--mantine-color-body)">
          <Stack gap="xs">
            <Title order={4}>Matches</Title>
            {org.matches.length > 0 ? (
              <Title order={1}
                style={{
                  fontWeight: 200
                }}
              >{org.matches.length}</Title>
            ) : (
              <Text>No Data Available</Text>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12 }}>
        <Paper mih={400} shadow="sm" radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
          {(org.roles?.length > 0 || org.matches?.length > 0) ? (
            <D3VisualizerBase
              data={data}
            />
          ) : (
            <Text>No Data Available</Text>
          )}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default OrgDetail;