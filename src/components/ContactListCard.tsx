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
import { useState, useEffect } from 'react';
import { getContacts, updateContactStatus, deleteContact } from '../untils/apiService';
import { useSnackbar } from '../assets/contexts/SnackbarManager';

interface Column {
  id: 'nameEmail' | 'phone' | 'additionalInfo' | 'status' | 'time' | 'action';
  dataKey?: keyof Data; // Specific keys that match Data properties
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number) => string;
  render?: (data: Data) => JSX.Element;
}

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo: string;
  status: string;
  time: string;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Data[]>([]); // Initialize empty rows
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch contacts data using the centralized function
    const fetchContacts = async () => {
      try {
        const data = await getContacts(); // Call the centralized API function
        setRows(data); // Set rows to the data returned from API
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateContactStatusToVerified = async (id: number) => {
    try {
      const response = await updateContactStatus(id);

      if (response) {
        // Update contact status in the state to "Verified"
        setRows(prevRows => prevRows.map(row => (row.id === id ? { ...row, status: 'Verified' } : row)));
        openSnackbar('Contact Status update successfully!', 'success');
      } else {
        console.error('Failed to update contact status');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContacts = async (id: number) => {
    try {
      const response = await deleteContact(id);

      if (response) {
        setRows(prevContacts => prevContacts.filter(contact => contact.id !== id));
        openSnackbar('Contact deleted successfully!', 'success');
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

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
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.additionalInfo}
          </div>
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
          label={data.status} // Directly use data.status
          sx={{
            bgcolor: data.status === 'Verified' ? '#dff0d8' : '#f2dede',
            color: data.status === 'Verified' ? '#3c763d' : '#a94442',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            borderRadius: '4px',
            '& .MuiChip-label': {
              padding: '4px 12px'
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
      render: (data: Data) => (
        <ActionMenu
          data={data}
          updateContactStatusToVerified={updateContactStatusToVerified}
          deleteContacts={deleteContacts}
        />
      )
    }
  ];

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
