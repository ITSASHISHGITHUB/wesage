import React, { useState } from 'react';
import { User, UserFormData } from '../types/types';
import UserModal from './UserModal';
import { useUserContext } from '../contexts/UserContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './UserTable.module.scss';

const UserTable: React.FC = () => {
  const { users, updateUser } = useUserContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };
  

  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (formData: UserFormData) => {
    if (currentUser) {
      updateUser(currentUser.id, formData);
    }
    setEditModalOpen(false);
  };

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const pageCount = Math.ceil(users.length / rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className={styles.actionsColumn}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className={styles.actionsColumn}>
                    <Button
                      className={styles.editButton}
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className={styles.noData}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.pagination}>
        <div className={styles.rowsPerPageContainer}>
          <span>Rows per page:</span>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className={styles.rowsPerPageSelect}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </div>
        
        <div className={styles.pageInfo}>
          {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, users.length)} of {users.length}
        </div>
        
        <div className={styles.pageButtons}>
          <Button
            className={styles.pageButton}
            disabled={page === 0}
            onClick={() => handleChangePage(page - 1)}
          >
            ← Prev
          </Button>
          <Button
            className={styles.pageButton}
            disabled={page >= pageCount - 1}
            onClick={() => handleChangePage(page + 1)}
          >
            Next →
          </Button>
        </div>
      </div>

      {currentUser && (
        <UserModal
          open={editModalOpen}
          title="Edit User"
          initialData={{
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email
          }}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default UserTable;
