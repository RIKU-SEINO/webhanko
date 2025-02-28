import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, CardActions } from '@mui/material';
import { StampProps } from '../types/Stamp';
import { useStampPreview } from '../hooks/useStampPreview';
import LoadingStampCard from './LoadingStampCard';

const StampCard: React.FC<StampProps> = (props) => {
  const { fetchStampPreview } = useStampPreview();
  const [imageURL, setImageURL] = useState<string>('');
  const [stampCategory, setStampCategory] = useState<string>('');
  const [stampType, setStampType] = useState<string>('');
  const [engravingType, setEngravingType] = useState<string>('');
  const [font, setFont] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoading(true);
      try {
        const preview = await fetchStampPreview(props);
        const blob = preview.blob;
        const url = URL.createObjectURL(blob);
        setImageURL(url);
        setStampCategory(preview.stamp_category);
        setStampType(preview.stamp_type);
        setEngravingType(preview.engraving_type);
        setFont(preview.font);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();
  }, [props]);

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 350, position: 'relative' }}>
      {isLoading ? (
        <LoadingStampCard />
      ) : (
        <>
          <Box sx={{ position: 'relative', height: 200 }}>
            <CardMedia component="img" height="100%" image={imageURL} alt="stamp" />
          </Box>

          <CardContent sx={{ height: 50 }}>
            <Typography variant="h6" component="div">
              {stampCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stampType}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: 'center', height: 50 }}>
            <Button variant="contained" color="primary" size="small">
              印影文字を入力して作成
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default StampCard;
