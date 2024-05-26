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
import { IconCirclesRelation } from '@tabler/icons-react';

export function AppFrame () {
  // Burger menu open controls
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
      padding={"md"}
      header={{ height: 60 }}
      navbar={{
        width: 225,
        breakpoint: 'xs',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      footer={{
        height: 60
      }}
    >
      <AppShell.Header>
        <Group align="center" justify="flex-start" h="100%" px="md" 
          style={{ 
            background: "rgb(2,0,36)",
            background: "linear-gradient(94deg, rgba(2,0,36,0) 0%, rgba(9,1,50,0) 58%, rgba(16,3,64,1) 67%, rgba(44,9,121,1) 81%, rgba(0,212,255,1) 100%)"
          }}
        >
          <Group h="100%">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            
            <Title order={2} style={{
              fontWeight: 500,
              fontFamily: 'Roboto, sans-serif'
            }}>
              Clear <IconCirclesRelation size={36} stroke={0.8} /> Connect
            </Title>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
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
        <Group justify="space-between" align="center" mt={3}>
          <img src={SFLogo} style={{ maxHeight: '1.3em' }} /> 
          <Title order={6}>
            Chris Mahoney, 2024
          </Title>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppFrame;