import React, { useState } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { UserFormData } from '../types/types';
import { useUserContext } from '../contexts/UserContext';
import { Button, Typography } from '@mui/material';
import styles from './UserManagement.module.scss';

const UserManagement: React.FC = () => {
  const { addUser } = useUserContext();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleAddSubmit = (formData: UserFormData) => {
    addUser(formData);
    setAddModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>User Management</Typography>
        <Button variant="contained" color="primary" className={styles.addButton} onClick={handleAddClick}>
          + Add New User
        </Button>
      </div>

      <UserTable />

      <UserModal
        open={addModalOpen}
        title="Add New User"
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
};

export default UserManagement;
