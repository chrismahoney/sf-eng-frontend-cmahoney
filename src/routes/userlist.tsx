import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import { Avatar, Grid, Pagination, Paper, Stack, Table, Text, Title } from '@mantine/core';
import {
  DataTable
} from 'mantine-datatable';

const UserList = () => {
  const navigate = useNavigate();
  const users = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);

  if (users.isLoading) {
    setIsFetching(true);
    return <div>Loading...</div>;
  }

  if (users.isError) {
    return <div>Error loading users.</div>;
  }

  useEffect(() => {
    if (!users || users.isLoading) return;

    setIsFetching(false);
  }, [users]);
  console.log('Users:', users);
  
  return (
    <Stack>
      <Title order={2}>
        Users
      </Title>
      <Text>Use the table below in order to explore information about registered users. These users have expressed interest in various roles, and these interests are matched against available roles provided by organizations.</Text>
      <Text>For more information about participant organizations, please see the <Link to="/orgs">Organizations</Link> page.</Text>
      <Grid>
        <Grid.Col span={{ xs: 12 }}>
          <DataTable
            // Styling
            withTableBorder
            borderRadius="md"
            minHeight={180}
            // Data
            columns={[
              { 
                accessor: 'user_image',
                render: (record) => <Avatar src={record.user_image} size="lg" radius="xl" />,
              },
              { accessor: 'first_name' }, 
              { accessor: 'last_name' }, 
              { 
                accessor: 'email',
                render: (record) => <Text>{record.email ? record.email : <em style={{ color: '#777' }}>N/A</em>}</Text>
              }
            ]}
            idAccessor="user_id"
            records={users.data}
            fetching={isFetching}
            // Loader UI
            loaderType="dots"
            loaderSize="xl"
            loaderColor="blue"
            loaderBackgroundBlur={1}
            // Event handlers
            onRowClick={({ record, index, event }) => {
              navigate(`/users/${record.user_id}`);
            }}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default UserList;