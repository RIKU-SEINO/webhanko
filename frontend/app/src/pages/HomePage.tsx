import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import StampCard from '../components/StampCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  // 印鑑データ
  const stampCategories = [
    { title: '個人印鑑', data: [
      { stamp_category: 'personal', stamp_type: 'official', engraving_type: 'one_col', font: 'insotai', text: ['坂本', '', ''], is_advanced: 'false', balance: 'small' },
      { stamp_category: 'personal', stamp_type: 'approval', engraving_type: 'one_col', font: 'reishotai', text: ['坂本', '', ''], is_advanced: 'false', balance: 'large' },
      { stamp_category: 'personal', stamp_type: 'shachihata', engraving_type: 'no_option', font: 'kaishotai', text: ['坂本', '', ''], is_advanced: 'false', balance: 'small' },
    ]},
    { title: '法人印鑑', data: [
      { stamp_category: 'company', stamp_type: 'representative', engraving_type: 'circle_center_two_rows', font: 'insotai', text: ['東西南北株式会社', '代表', '取締役'], is_advanced: 'false', balance: 'large' },
      { stamp_category: 'company', stamp_type: 'square', engraving_type: 'two_cols', font: 'insotai', text: ['東西南北', '株式会社', ''], is_advanced: 'false', balance: 'small' },
    ]},
    { title: '日付印鑑', data: [
      { stamp_category: 'date', stamp_type: 'circle', engraving_type: 'no_option', font: 'kaishotai', text: ['東西南北株式会社', '2025.01.01', '受領'], is_advanced: 'false', balance: 'small' },
      { stamp_category: 'date', stamp_type: 'square', engraving_type: 'no_option', font: 'kaishotai', text: ['東西南北株式会社', '2025.01.01', '受付'], is_advanced: 'false', balance: 'small' },
    ]},
  ];

  // 印鑑セクションを生成する関数
  const renderStampSection = (title: string, stamps: any[]) => (
    <Box sx={{ my: 4, width: '100%', maxWidth: 1200 }} key={title}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {stamps.map((params, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={`${params.stamp_category}-${params.stamp_type}-${index}`}
          >
            <StampCard {...params} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        無料で簡単に電子印鑑画像を作成
      </Typography>
      <Typography variant="body2" align="center" paragraph>
        実印、認印、シャチハタ印、代表者印など多様な印鑑を無料で作成できるサイトです。
        印影文字のフォントや彫刻方向、印影のバランスなど自由にカスタマイズできます。
      </Typography>

      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '50px' }}>
        {stampCategories.map(({ title, data }) => renderStampSection(title, data))}
      </Box>
    </>
  );
};

export default HomePage;
