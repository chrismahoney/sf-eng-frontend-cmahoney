import { Avatar, Title, Text, Tree, Grid, Paper } from '@mantine/core';

export default function UserDetailCard (props) {
  const {
    user
  } = props;

  // Map interests to Tree data model
  const interestData = user.interested_in.map((interest) => { 
    return {
      value: interest,
      label: interest
    }
  });
  const matchData = user.matches.map((match) => {
    return {
      value: match.role,
      label: match.role
    }
  })
  console.log('Interests', interestData);

  return (
    <Grid>
      <Grid.Col span={12}>
        <Paper radius="md" mih={200} withBorder p="lg" bg="var(--mantine-color-body)">
          <Avatar
            src={user.user_image}
            size={'xl'}
            radius={'lg'}
            mx='auto'
          />
          <Text ta="center" fz="lg" fw={700} mt="md">
            {user.first_name} {user.last_name}
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            {user.email ? user.email : 'Email Not Available'}
          </Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper radius="md" mih={200} withBorder p="lg" bg="var(--mantine-color-body)">
          <Title order={4}>
            Your Role Interests
          </Title>
          <Tree 
            data={interestData ? interestData : [{ value: "None", label: "None Specified"}]} 
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper radius="md" mih={200} withBorder p="lg" bg="var(--mantine-color-body)">
          <Title order={4}>
            Your Matches
          </Title>
          <Tree
            data={matchData ? matchData : [{ value: "None", label: "None Available" }]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}