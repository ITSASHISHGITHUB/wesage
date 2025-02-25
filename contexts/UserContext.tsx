'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserFormData } from '../types/types';

const initialUsers: User[] = [
    { id: 1, first_name: 'Ashish', last_name: 'Yadav', email: 'Ay677204@gmail.com' },
    { id: 2, first_name: 'Vivi', last_name: 'Patel', email: 'vivsdi@gmail.com' },
    { id: 3, first_name: 'Aditya', last_name: 'Verma', email: 'sdditya@gmail.com' },
    { id: 4, first_name: 'Anaya', last_name: 'Singh', email: 'ansdya@gmail.com' },
    { id: 5, first_name: 'Diya', last_name: 'Kumar', email: 'diysaa@gmail.com' },
    { id: 6, first_name: 'Ishaan', last_name: 'Mehta', email: 'issfhaan@gmail.com' },
    { id: 7, first_name: 'Saanvi', last_name: 'Reddy', email: 'saasfvi@gmail.com' },
    { id: 8, first_name: 'Kabir', last_name: 'Nair', email: 'kabiasr@gmail.com' },
    { id: 9, first_name: 'Riya', last_name: 'Choudhary', email: 'risadya@gmail.com' },
    { id: 10, first_name: 'Rahul', last_name: 'Yadav', email: 'rahfsul@gmail.com' },
  ];

interface UserContextType {
  users: User[];
  addUser: (userData: UserFormData) => void;
  updateUser: (id: number, userData: UserFormData) => void;
  getUser: (id: number) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = (userData: UserFormData) => {
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      ...userData
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: number, userData: UserFormData) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const getUser = (id: number) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};