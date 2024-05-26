import { Container, Flex, Grid, Title } from '@mantine/core';
import DataTable from '../DataTable/DataTable';

export default function HomeDashboard () {
  return (
    <div>
      <Grid>
        <Grid.Col>
          <Title order={2}>Home</Title>
        </Grid.Col>
        <Grid.Col span="auto">
          Welcome to Clear Connect
        </Grid.Col>
      </Grid>
    </div>
  );
}