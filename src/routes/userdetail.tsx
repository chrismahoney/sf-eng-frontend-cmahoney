import { useLoaderData } from "react-router-dom";
import { Avatar, Title, Text, Grid, Paper, Stack, Group, SimpleGrid, Flex } from '@mantine/core';
import D3VisualizerBase from '../components/Charting/Visualizers/D3VisualizerBase';

function UserDetail () {
  const user = useLoaderData(); 

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    return <div>Error loading users.</div>;
  }

  // Map interests to Tree data model
  const interestData = user.interested_in?.map((interest) => { 
    return {
      name: interest,
      label: interest,
      value: 1,
      children: user.matches
        .filter((match) => {
          return match.user_interest === interest;
        }).map((match) => {
          return {
            name: `${match.role} ${match.org_name}`,
            label: match.role,
            value: 1,
          }
        })
    }
  });
  const matchData = user.matches?.map((match) => {
    return {
      name: `${match.role} (${match.match_level}%)`,
      label: match.role,
      value: 100.0/user.matches.length-1
    }
  });

  const data = {
    name: `${user.last_name}`,
    children: interestData
  };

  return (
    <Grid>
      <Grid.Col span={{ xs: 12, md: 4 }}>
        <Paper mih={150} shadow="sm" radius="md" withBorder p="sm" bg="var(--mantine-color-body)">
          <Avatar
            src={user.user_image}
            size={'lg'}
            radius={'xl'}
            m={0}
            mb={"sm"}
          />
          <Stack gap="xs" justify="flex-start" align="flex-start">
            <Text fz="lg" fw={700} m={0}>
              {user.first_name} {user.last_name}
            </Text>
            <Text c="dimmed" fz={"xs"} m={0}>
              {user.email ? user.email : 'Email Not Available'}
            </Text>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Paper mih={150} shadow="sm" radius="sm" withBorder p="sm" bg="var(--mantine-color-body)">
          <Stack gap="xs">
            <Title order={4}>Role Interests</Title>
            {user.interested_in?.length > 0 ? (
              <Title order={1}
                style={{
                  fontWeight: 200
                }}
              >{user.interested_in.length}</Title>
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
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Paper mih={150} shadow="sm" radius="sm" withBorder p="sm" bg="var(--mantine-color-body)">
          <Stack gap="xs">
            <Title order={4}>Role Matches</Title>
            {user.matches?.length > 0 ? (
              <Title order={1}
                style={{
                  fontWeight: 200
                }}
              >{user.matches.length}</Title>
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
      <Grid.Col span={{ sm: 12 }}>
        <Paper mih={400} shadow="sm" radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
          {(user.interested_in?.length > 0 || user.matches?.length > 0) ? (
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

export default UserDetail;