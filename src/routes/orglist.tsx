import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import { Avatar, Grid, Stack, Text, Title } from '@mantine/core';
import {
  DataTable
} from 'mantine-datatable';

const OrgList = () => {
  const navigate = useNavigate();
  const orgs = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);

  if (orgs.isLoading) {
    setIsFetching(true);
    return <div>Loading...</div>;
  }

  if (orgs.isError) {
    return <div>Error loading orgs.</div>;
  }

  useEffect(() => {
    if (!orgs || orgs.isLoading) return;

    setIsFetching(false);
  }, [orgs]);
  console.log('Orgs:', orgs);
  
  return (
    <Stack>
      <Title order={2}>
        Organizations
      </Title>
      <Text>
        Use the table below in order to explore information about registered organizations. These organizations have provided information about available roles, and these roles are matched against user interests.
      </Text>
      <Grid>
        <Grid.Col span={{ xs: 12 }}>
          <DataTable
            // Styling
            withTableBorder
            borderRadius="md"
            minHeight={180}
            // Data
            columns={[
              { accessor: 'org_name' },
              { 
                accessor: 'roles',
                textAlign: 'center',
                render: (record) => <Text>{record.roles ? record.roles.length : <em style={{ color: '#777' }}>N/A</em>}</Text>
              }
            ]}
            idAccessor="org_name"
            records={orgs.data}
            fetching={isFetching}
            // Loader UI
            loaderType="dots"
            loaderSize="xl"
            loaderColor="blue"
            loaderBackgroundBlur={1}
            // Event handlers
            onRowClick={({ record, index, event }) => {
              navigate(`/orgs/${record.org_name}`);
            }}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default OrgList;