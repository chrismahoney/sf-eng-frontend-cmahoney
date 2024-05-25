import { Grid, Title } from '@mantine/core';

function HomeDashboard () {
  return (
    <Grid grow>
      <Grid.Col span={4}>
        <Title order={2}>1</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={2}>2</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={2}>3</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={2}>4</Title>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={2}>5</Title>
      </Grid.Col>
    </Grid>
  );
}