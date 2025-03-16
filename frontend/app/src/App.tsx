import React, { useState, useMemo, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import InquiryPage from './pages/InquiryPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PasswordResetRequirePage from './pages/PasswordResetRequirePage';
import PasswordResetConfirmationPage from './pages/PasswordResetConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import CommonLayout from './pages/CommonLayout';
import { User } from './types/User';

export const AuthContext = createContext({} as {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedInAdmin: boolean;
  setIsSignedInAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
});

export const FlashMessageContext = createContext({} as {
  flashMessageSuccess: string;
  setFlashMessageSuccess: React.Dispatch<React.SetStateAction<string>>;
  flashMessageError: string;
  setFlashMessageError: React.Dispatch<React.SetStateAction<string>>;
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedInAdmin, setIsSignedInAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [flashMessageSuccess, setFlashMessageSuccess] = useState<string>('');
  const [flashMessageError, setFlashMessageError] = useState<string>('');

  const authContextValue = useMemo(() => ({
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    isSignedInAdmin,
    setIsSignedInAdmin,
    currentUser,
    setCurrentUser,
  }), [loading, isSignedIn, isSignedInAdmin, currentUser]);

  const flashMessageContextValue = useMemo(() => ({
    flashMessageSuccess,
    setFlashMessageSuccess,
    flashMessageError,
    setFlashMessageError,
  }), [flashMessageSuccess, flashMessageError]);

  return (
    <Router>
      <AuthContext.Provider value={authContextValue}>
      <FlashMessageContext.Provider value={flashMessageContextValue}>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/password_reset_require" element={<PasswordResetRequirePage />} />
            <Route path="/password_reset_confirmation" element={<PasswordResetConfirmationPage />} />

            <Route path="/profile/:id" element={
              <ProfilePage />
            } />

            <Route path="/admin" element={
              <AdminPage />
            } />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CommonLayout>
      </FlashMessageContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;