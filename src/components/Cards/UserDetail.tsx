import { Avatar, Title, Text, Grid, Paper, Stack, Group, SimpleGrid, Flex } from '@mantine/core';
import D3VisualizerBase from '../Charting/Visualizers/D3VisualizerBase';

export default function UserDetail (props) {
  const {
    user
  } = props;

  // Map interests to Tree data model
  const interestData = user.interested_in?.map((interest) => { 
    return {
      name: interest,
      label: interest,
      value: 100.0/user.interested_in.length-1
    }
  });
  const matchData = user.matches?.map((match) => {
    return {
      name: `${match.role} (${match.match_level}%)`,
      label: match.role,
      value: 100.0/user.matches.length-1
    }
  });
  console.log(matchData);

  const data = {
    name: `${user.first_name} ${user.last_name} (${user.user_id})`,
    children: [
      {
        name: "interests",
        children: interestData
      }
    ]
  };

  return (
    <Grid>
      <Grid.Col span={{ xs: 12, md: 4 }}>
        <Paper mih={150} shadow="sm" radius="md" withBorder p="sm" bg="var(--mantine-color-body)">
          
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
            <Title order={4}>Role Interests:</Title>
            {user.interested_in ? (
              <Title order={1}>{user.interested_in.length} role(s)</Title>
            ) : (
              <Text>No Data Available</Text>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <Paper mih={150} shadow="sm" radius="sm" withBorder p="sm" bg="var(--mantine-color-body)">
          <Stack gap="xs">
            <Title order={4}>Role Matches:</Title>
            {user.matches ? (
              <Title order={1}>{user.matches.length} role(s)</Title>
            ) : (
              <Text>No Data Available</Text>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12 }}>
        <Paper shadow="sm" radius="sm" withBorder p="lg" bg="var(--mantine-color-body)">
          {(interestData?.length > 0 || matchData?.length > 0) ? (
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