import React, { useContext } from 'react';
import { PrivateUser } from './AccessControl';
import { AuthContext } from '../App';

const AdminPage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <PrivateUser>
        <h1>Admin Page</h1>
        <div>
          <p>管理者ページ</p>
          <p>メールアドレス: {currentUser?.email}</p>
        </div>
      </PrivateUser>
    </>
  );
};

export default AdminPage;
