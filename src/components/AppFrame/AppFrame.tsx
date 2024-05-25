import {
  NavLink,
  Outlet
} from 'react-router-dom';

import { 
  AppShell, 
  Burger,
  Group,
  Title,
} from '@mantine/core';
import {
  useDisclosure 
} from '@mantine/hooks';

import SFLogo from './SFLogo.png';
import { AppSidebarMenu } from './AppSidebarMenu';

export function AppFrame () {
  // Burger menu open control
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      padding={"md"}
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: true }}
    >
      <AppShell.Header>
        <Group align="center" justify="space-between" h="100%" px="md" style={{ minWidth: 500 }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src={SFLogo} style={{ maxHeight: '2em' }} />

          <Title order={2} style={{
            fontSize: '1.1em',
            fontWeight: 400,
            fontFamily: 'Roboto, sans-serif'
          }}>
            Clear Connect
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={0}>
        <AppSidebarMenu />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer 
        className={"footer"}
        p="md"
        style={{
          color: '#fff',
          fontWeight: 700,
          background: "rgb(2,0,36)",
          background: "linear-gradient(218deg, rgba(2,0,36,1) 0%, rgba(44,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Group justify="flex-end" align="center">
          <Title order={6}>
            Chris Mahoney, 2024
          </Title>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppFrame;