import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { AuthContext } from '../App';
import { useAuth } from '../hooks/useAuth';
import { FlashMessageContext } from '../App';

const Header: React.FC = () => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);
  const { handleSignOut, handleFetchCurrentUser } = useAuth();
  const { setFlashMessageSuccess, setFlashMessageError } = useContext(FlashMessageContext);

  const profileUrl = () => {
    if (currentUser) {
      return `/profile/${currentUser.id}`;
    }
    return '/';
  }

  useEffect(() => {
    handleFetchCurrentUser();
  }, []);

  const handleSignOutClick = async () => {
    try {
      await handleSignOut();
      setFlashMessageSuccess('ログアウトしました');
    } catch (error: any) {
      setFlashMessageError('ログアウトに失敗しました');
    }
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: 'black', textDecoration: 'none' }}>Webハンコ！</a>
        </Typography>
        <Box>
          {loading ? (
            <></>
          ) :
          isSignedIn && currentUser ? (
            <>
              <Button color="inherit" href={profileUrl()}>マイページ</Button>
              <Button color="inherit" onClick={handleSignOutClick}>ログアウト</Button>
            </>
          ) : (
            <>
              <Button color="inherit" href='/signin'>ログイン</Button>
              <Button color="inherit" href='/signup'>アカウント作成</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;