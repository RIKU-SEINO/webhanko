import { useContext } from 'react';
import { AuthContext } from '../App';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

export const PrivateUser = ({ children }: { children: React.ReactNode }) => {
  const { loading, isSignedIn, isSignedInAdmin, currentUser } = useContext(AuthContext);
  const { id } = useParams();

  if (loading) {
    return <></>;
  }

  if (!isSignedIn) {
    return <NotFoundPage />;
  }

  if (isSignedInAdmin || (currentUser && currentUser.id === Number(id))) {
    return <>{children}</>;
  }

  return <NotFoundPage />;
};

export const PrivateAdmin = ({ children }: { children: React.ReactNode }) => {
  const { loading, isSignedIn, isSignedInAdmin } = useContext(AuthContext);

  if (loading) {
    return <></>;
  }

  if (isSignedIn && isSignedInAdmin) {
    return <>{children}</>;
  }

  return <NotFoundPage />;
};
