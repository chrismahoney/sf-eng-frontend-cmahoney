import { Grid, Title } from '@mantine/core';

export default function HomeDashboard () {
  return (
    <div>
      <Grid>
        <Grid.Col>
          <Title order={2}>Welcome to Clear Connect</Title>
        </Grid.Col>
        <Grid.Col span="auto">
          <p>This application is intended to help you manage and review data associated with matching
          organizations with available, interested applicants for various roles.</p>

          <p>Use the sidebar menu icon in order to navigate the application, and review data for organizations and users in the system.</p>
        </Grid.Col>
      </Grid>
    </div>
  );
}