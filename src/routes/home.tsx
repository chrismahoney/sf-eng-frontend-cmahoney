import { Stack, Title } from "@mantine/core";
import HomeDashboard from "../components/Charting/HomeDashboard";


export default function Home() {
  return (
      <Stack>
        <Title order={2}>
          Welcome
        </Title>
        <HomeDashboard /> 
      </Stack>
  );
}