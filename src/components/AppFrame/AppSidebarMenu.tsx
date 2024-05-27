import {
  IconBellRinging,
  IconUsers,
  IconDice1,
  IconHome,
} from '@tabler/icons-react';
import classes from './AppSidebarMenu.module.css';
import { NavLink } from 'react-router-dom';
import { Stack } from '@mantine/core';

const tabs = {
  main: [
    { link: '/', label: 'Home', icon: IconHome },
    // { link: '/orgs', label: 'Organizations', icon: IconBellRinging },
    { link: '/users', label: 'Users', icon: IconUsers },
    { link: '/users/random', label: 'Random User', icon: IconDice1 },
  ],
};

export function AppSidebarMenu () {
  const links = tabs['main'].map((item) => (
    <NavLink
      className={classes.link}
      to={item.link}
      key={item.label}
      style={{
        color: 'var(--mantine-color-black)',
        textDecoration: 'none',
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <Stack gap={"sm"} className={classes.navbarMain} mt={0}>
        {links}
      </Stack>
    </nav>
  );
}