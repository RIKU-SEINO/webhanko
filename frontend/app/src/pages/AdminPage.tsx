import React from 'react';
import { useListUsers } from '../hooks/useListUsers';

const AdminPage: React.FC = () => {
  const  { users, errorMessage, fetchUsers } = useListUsers();

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        管理者ページ
      </div>
      <div>
        <button onClick={fetchUsers}>ユーザー一覧を取得</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
