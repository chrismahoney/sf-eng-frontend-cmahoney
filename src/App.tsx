// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/charts/styles.css';

/* Custom MantineProvider-based theme import, theme provider */
import { AppTheme } from './theme/AppTheme';
import {
  MantineProvider
} from '@mantine/core';

/* App layout and page content */
import Root from "./routes/root";
import Home from "./routes/home";
import UserList from "./routes/userlist";
import UserDetail from "./routes/userdetail";
import OrgList from "./routes/orglist";
import OrgDetail from "./routes/orgdetail";

/* Routing */
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import ErrorRoute from './routes/error-route';

const fetchOrgs = async (options: any) => {
  const page_num = options.page_num || 1;
  const page_size = options.page_size || 10;
  const org_id = options.org_id || '';

  const response = await fetch(`http://localhost:3000/matches_by_org?org_id=${org_id}&page_num=${page_num}&page_size=${page_size}`);
  return await response.json();
};
const fetchOrg = async ({ params }) => {
  return await fetchOrgs({ org_id: params.org_id });
};
const fetchUsers = async (options: any) => {
  const page_num = options.page_num || 1;
  const page_size = options.page_size || 10;
  const user_id = options.user_id || '';

  const response = await fetch(`http://localhost:3000/matches_by_user?user_id=${user_id}&page_num=${page_num}&page_size=${page_size}`);
  return await response.json();
};
const fetchUser = async ({ params }) => {
  return await fetchUsers({ user_id: params.user_id });
};
const fetchRandomUser = async ({ params }) => {
  return await fetchUsers({ user_id: Math.floor(Math.random() * 100) });
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}
      errorElement={<ErrorRoute />}
    >
      <Route path="/" element={<Home />} />
      <Route path="/orgs" element={<OrgList />} loader={fetchOrgs} />
      <Route path="/orgs/:org_id" element={<OrgDetail />} loader={fetchOrg} />

      <Route path="/users" element={<UserList />} loader={fetchUsers} />
      <Route path="/users/:user_id" element={<UserDetail />} loader={fetchUser} />
      <Route path="/users/random" element={<UserDetail />} loader={fetchRandomUser} />
    </Route>
  )
);

/* Theming */
const theme = AppTheme;

export default function App () {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}