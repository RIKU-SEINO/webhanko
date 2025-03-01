import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, CardActions } from '@mui/material';
import { StampProps } from '../types/Stamp';
import { useStampPreview } from '../hooks/useStampPreview';
import Loading from './Loading';
import StampDialog from './StampDialog';

const StampCard: React.FC<StampProps> = (props) => {
  const { fetchStampPreview } = useStampPreview();
  const [imageURL, setImageURL] = useState<string>('');
  const [stampCategory, setStampCategory] = useState<string>('');
  const [stampType, setStampType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoading(true);
      try {
        const preview = await fetchStampPreview(props);
        const blob = preview.blob;
        const url = URL.createObjectURL(blob);
        setImageURL(url);
        setStampCategory(preview.stamp_category[props.stamp_category]);
        setStampType(preview.stamp_type[props.stamp_type]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();
  }, [props]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
    <Card sx={{ maxWidth: 200, maxHeight: 350, position: 'relative' }}>
      {isLoading ? (
        <Loading
          width={200}
          height={348}
        />
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
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={openDialog}>
              <Typography variant="body2" color="text.primary">
                作成情報入力に進む
              </Typography>
            </Button>
          </CardActions>
        </>
      )}
    </Card>

    <StampDialog
      open={open}
      onClose={closeDialog}
      props={props}
    ></StampDialog>
    </div>
  );
};

export default StampCard;
