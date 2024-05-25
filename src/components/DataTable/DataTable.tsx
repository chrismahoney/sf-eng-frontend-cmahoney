import { Pagination, Stack, Table } from '@mantine/core';
import { useState } from 'react';

export default function DataTable(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    tableHeaders,
    rowElements,
    data
  } = props;

  return (
    <Stack justify="stretch" miw={400}>
      <Table 
        cellSpacing={0}
        striped
        highlightOnHover
        withTableBorder
        style={(theme) => ({
          border: `1px solid ${theme.colors.blue[8]}`,
          borderRadius: theme.radius.md,
        })}
      >
        <Table.Thead
          style={(theme) => ({
            backgroundColor: theme.colors.blue[8],
            color: theme.colors.gray[0],
          })}
        >
          {tableHeaders}
        </Table.Thead>
        <Table.Tbody>{rowElements}</Table.Tbody>
      </Table>
      <Pagination 
        total={(data.total/data.count)}
        value={currentPage}
        onChange={(val) => {
          setCurrentPage(val);
        }} 
      />
    </Stack>
  );
}