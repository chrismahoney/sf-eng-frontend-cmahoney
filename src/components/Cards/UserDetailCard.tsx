import { Avatar, Text, Button, Paper } from '@mantine/core';

export default function UserDetailCard (props) {
  const {
    user
  } = props;
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
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
  );
}