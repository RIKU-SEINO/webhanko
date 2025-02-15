import { useState } from 'react';
import { apiClient } from '../lib/apiClient';
import { User, UserResponse } from '../types/User';

export const useListUsers = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchUsers = async () => {
    setErrorMessage('');

    await apiClient.get<Array<UserResponse>>('/users')
      .then((response) => {
        setUsers(
          response.data.map((user) => ({
            id: user.id,
            email: user.email,
          }))
        )
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return {
    users,
    errorMessage,
    fetchUsers,
  };
};