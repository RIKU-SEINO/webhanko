import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { SignUpParams } from '../types/User';
import { FlashMessageContext } from '../App';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState
  <string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signUp, handleFetchCurrentUser } = useAuth();
  const { flashMessageSuccess, setFlashMessageSuccess, setFlashMessageError } = useContext(FlashMessageContext);

  const handleTogglePasswordVisibility = (mode: string) => {
    if (mode === 'password') {
      setShowPassword(!showPassword);
    }
    if (mode === 'passwordConfirmation') {
      setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  };

  const validate = () => {
    if (!email || !password || !passwordConfirmation) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: SignUpParams = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    try {
      const res = await signUp(params);
      if (res.data.status === 'success') {
        navigate('/');
        setFlashMessageSuccess('アカウントを作成しました');
      } else {
        setFlashMessageError('アカウントの作成に失敗しました');
      }
    } catch (e) {
      setFlashMessageError('アカウントの作成に失敗しました');
      console.log(e);
    }
  };

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
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>アカウント作成</Typography>
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
                  <IconButton onClick={
                    () => handleTogglePasswordVisibility('password')
                  } edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="パスワード（確認）"
            placeholder="8文字以上のパスワード"
            type={showPasswordConfirmation ? 'text' : 'password'}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={
                    () => handleTogglePasswordVisibility('passwordConfirmation')
                  } edge="end">
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            アカウントを作成
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: 'center',
              marginTop: 5,
            }}
          >
            すでにアカウントをお持ちの方は{' '}
            <Link href="/signin" underline="hover">
              こちらからログイン
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignupPage;
