import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: 'black', textDecoration: 'none' }}>Webハンコ！</a>
        </Typography>
        <Box>
          <Button color="inherit">サインイン</Button>
          <Button color="inherit">サインアップ</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;