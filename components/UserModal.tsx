import React from 'react';
import UserForm from './UserForm';
import { UserFormData } from '../types/types';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import styles from './UserModal.module.scss';

interface UserModalProps {
  open: boolean;
  title: string;
  initialData?: UserFormData;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, title, initialData, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.modal}>
      <DialogTitle className={styles.modalTitle}>{title}</DialogTitle>
      <DialogContent className={styles.modalBody}>
        <UserForm initialData={initialData} onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
