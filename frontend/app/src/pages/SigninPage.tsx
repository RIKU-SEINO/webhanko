import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { SignInParams } from '../types/User';
import { FlashMessageContext } from '../App';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signIn, handleFetchCurrentUser } = useAuth();
  const { flashMessageSuccess, setFlashMessageSuccess, setFlashMessageError } = useContext(FlashMessageContext);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: SignInParams = {
      email: email,
      password: password,
    };
    try {
      const res = await signIn(params);
      if (res.status === 200) {
        navigate('/');
        setFlashMessageSuccess('ログインしました');
      } else {
        setFlashMessageError('ログインに失敗しました');
      }
    } catch (e) {
      setFlashMessageError('ログインに失敗しました');
      console.log(e);
    }
  }

  useEffect(() => {
    handleFetchCurrentUser();
  }
  , [flashMessageSuccess]);

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>ログイン</Typography>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            fullWidth
            label="メールアドレス"
            placeholder="example@example.com"
            type="email"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="パスワード"
            placeholder="8文字以上のパスワード"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            sx={{
              mt: 2,
              marginTop: 5,
              backgroundColor: 'white',
              boxShadow: 'none',
              border: '2px solid black',
            }}
            disabled={!validate()}
            onClick={handleSubmit}
          >
            ログイン
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: 'center',
              marginTop: 5,
            }}
          >
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" underline="hover">
              こちらから作成
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
