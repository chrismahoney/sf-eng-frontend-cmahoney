import { Link, useLoaderData } from 'react-router-dom';
import DataTable from '../components/DataTable/DataTable';
import { Center, Stack, Table, Title } from '@mantine/core';

const OrgList = () => {
  const orgs = useLoaderData();

  if (orgs.isLoading) {
    return <div>Loading...</div>;
  }

  if (orgs.isError) {
    return <div>Error loading orgs.</div>;
  }


  const tableHeaders = (
    <Table.Tr>
      <Table.Th>Organization Name</Table.Th>
      <Table.Th>Opportunities</Table.Th>
      <Table.Th>Matches</Table.Th>
    </Table.Tr>
    );

  const rowElements = orgs.data.map((row) => (
    <Table.Tr key={row.org_name}>
      <Table.Td>
        <Link to={`${row.org_name}`}>
          {row.org_name}
        </Link>
      </Table.Td>
      <Table.Td>{row.roles.length}</Table.Td>
      <Table.Td>{row.matches.length}</Table.Td>
    </Table.Tr>
  ));

  // Render the orgs
  return (
    <Stack>
      <Title order={2}>
        Organizations
      </Title>
      <DataTable
        tableHeaders={tableHeaders}
        rowElements={rowElements}
        data={orgs}
      />
    </Stack>
  );
};

export default OrgList;