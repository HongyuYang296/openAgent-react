import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Card,
  Chip, // Import Chip for status tags
  Tooltip
} from '@mui/material';
import ActionMenu from './ActionMenu';

interface Column {
  id: 'nameEmail' | 'phone' | 'additionalInfo' | 'status' | 'time' | 'action';
  dataKey?: keyof Data; // Specific keys that match Data properties
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number) => string;
  render?: (data: Data) => JSX.Element;
}

const columns: readonly Column[] = [
  {
    id: 'nameEmail',
    label: 'Contacts',
    minWidth: 210,
    align: 'left',
    render: (data: Data) => (
      <div>
        <div style={{ fontWeight: 'bold' }}>
          {data.firstName} {data.lastName}
        </div>
        <div>{data.email}</div>
      </div>
    )
  },
  { id: 'phone', dataKey: 'phone', label: 'Phone', minWidth: 120 },
  {
    id: 'additionalInfo',
    label: 'Additional Info',
    minWidth: 200,
    align: 'left',
    render: (data: Data) => (
      <Tooltip title={data.additionalInfo} placement="top-start">
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.additionalInfo}</div>
      </Tooltip>
    )
  },
  {
    id: 'status',
    dataKey: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'center',
    render: (data: Data) => (
      <Chip
        label={data.status}
        sx={{
          bgcolor: data.status === 'Active' ? '#dff0d8' : '#f2dede', // background color
          color: data.status === 'Active' ? '#3c763d' : '#a94442', // text color
          fontSize: '0.875rem', // match default font size or customize
          fontWeight: 'bold', // make text bold
          borderRadius: '4px', // rounded corners
          '& .MuiChip-label': {
            padding: '4px 12px' // padding inside the chip
          }
        }}
        size="small"
      />
    )
  },
  { id: 'time', dataKey: 'time', label: 'Time', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
    align: 'center',
    render: (data: Data) => <ActionMenu data={data} />
  }
];

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo: string;
  status: string;
  time: string;
}

function createData(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  additionalInfo: string,
  status: string,
  time: string
): Data {
  return { firstName, lastName, email, phone, additionalInfo, time, status };
}

const rows = [
  createData('John', 'Doe', 'johndoe@example.com', '123-456-7890', 'No Notes', 'Active', '23/04/18'),
  createData('Jane', 'Doe', 'janedoe@example.com', '098-765-4321', 'Important Client', 'Inactive', '23/04/18'),
  createData('Alice', 'Johnson', 'alicej@example.com', '456-789-0123', 'Requires Follow-up', 'Active', '23/04/18')
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card sx={{ borderRadius: '14px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align || 'left'} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                    {columns.map(column => {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {column.render ? column.render(row) : column.dataKey ? row[column.dataKey] : undefined}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Card>
  );
}
