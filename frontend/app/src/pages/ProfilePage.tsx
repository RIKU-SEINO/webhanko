import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PrivateUser } from './AccessControl';
import { AuthContext } from '../App';

const ProfilePage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <PrivateUser>
        <h1>Profile Page</h1>
        <div>
          <p>メールアドレス: {currentUser?.email}</p>
        </div>
      </PrivateUser>
    </>
  );
};

export default ProfilePage;
