import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, CardActions } from '@mui/material';
import { StampProps } from '../types/Stamp';
import { StampDialogState } from '../types/StampDialog';
import { useStampPreview } from '../hooks/useStampPreview';
import Loading from './Loading';
import StampDialog from './StampDialog';

const StampCard: React.FC<StampProps> = (props) => {
  const { fetchStampPreview } = useStampPreview();
  const [imageURL, setImageURL] = useState<string>('');
  const [stampCategory, setStampCategory] = useState<string>('');
  const [stampType, setStampType] = useState<string>('');
  const [stampDialogState, setStampDialogState] = useState<StampDialogState>({
    ...props,
    stampCategoryObj: {},
    stampTypeObj: {},
    engravingTypeObj: {},
    fontObj: {},
    textObj: {},
    engravingTypesObj: {},
    fontsObj: {},
  });
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
        setStampDialogState({
          ...props,
          stampCategoryObj: preview.stamp_category,
          stampTypeObj: preview.stamp_type,
          engravingTypeObj: preview.engraving_type,
          fontObj: preview.font,
          textObj: preview.text,
          engravingTypesObj: preview.engraving_type_candidates,
          fontsObj: preview.font_candidates,
        });
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
      state={stampDialogState}
      imageUrl={imageURL}
    ></StampDialog>
    </div>
  );
};

export default StampCard;
