import { Link, useLoaderData } from 'react-router-dom';
import DataTable from '../components/DataTable/DataTable';
import { Avatar, Stack, Table, Title } from '@mantine/core';

const UserList = () => {
  const users = useLoaderData();

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  if (users.isError) {
    return <div>Error loading users.</div>;
  }

  const tableHeaders = (
    <Table.Tr key="headers">
      <Table.Th></Table.Th>
      <Table.Th>First Name</Table.Th>
      <Table.Th>Last Name</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Interested In</Table.Th>
      <Table.Th>Matches</Table.Th>
    </Table.Tr>
  );

  const rowElements = users.data.map((row) => (
    <Table.Tr key={row.user_id}>
      <Table.Td>
        <Avatar 
          variant="transparent" 
          radius="md" 
          size="md" 
          src={row.user_image} 
        />
      </Table.Td>
      <Table.Td>
        <Link to={`${row.user_id}`}>
          {row.first_name}
        </Link>
      </Table.Td>
      <Table.Td>{row.last_name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.interested_in.length}</Table.Td>
      <Table.Td>{row.matches.length}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack>
      <Title order={2}>
        Users
      </Title>
      <DataTable
        tableHeaders={tableHeaders}
        rowElements={rowElements}
        data={users}
      />
    </Stack>
  );
};

export default UserList;