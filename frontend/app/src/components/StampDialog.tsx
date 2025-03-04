import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StampProps } from '../types/Stamp';
import { useStampPreview } from '../hooks/useStampPreview';
import Loading from './Loading';
import StampDownloadButton from './StampDownloadButton';
import { StampDialogProps, StampDialogState } from '../types/StampDialog';

const StampDialog: React.FC<StampDialogProps> = ({ open, onClose, props, state, imageUrl }) => {
  const { fetchStampPreview } = useStampPreview();
  const [imageURL, setImageURL] = useState<string>(imageUrl);
  const [stampProps, setStampProps] = useState<StampProps>(props);
  const [stampDialogState, setStampDialogState] = useState<StampDialogState>(state);
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setImageURL(imageUrl);
    setStampProps(props);
    setStampDialogState(state);
  }
  , [imageUrl, props, state]);

  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoadingPreview(true);
      try {
        const preview = await fetchStampPreview(stampProps);
        const blob = preview.blob;
        const url = URL.createObjectURL(blob);
        setImageURL(url);
        setStampDialogState({
          ...stampProps,
          stampCategoryObj: preview.stamp_category,
          stampTypeObj: preview.stamp_type,
          engravingTypeObj: preview.engraving_type,
          fontObj: preview.font,
          textObj: preview.text,
          engravingTypesObj: preview.engraving_type_candidates,
          fontsObj: preview.font_candidates,
        });
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoadingPreview(false);
      }
    };

    if (open) fetchPreview();
  }, [stampProps]);

  useEffect(() => {
    const updateStampText = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setStampProps((prev) => ({
          ...prev,
          text: Object.values(stampDialogState.textObj),
        }));
      }, 500);
    };

    updateStampText();
  }, [Object.values(stampDialogState.textObj).join('')]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ width: '100%' }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        作成情報の入力
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ height: '410px' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* プレビューエリア */}
          <Grid item xs={4.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '80%', aspectRatio: '1 / 1', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoadingPreview ? (
                <Loading
                  width={100}
                  height={100}
                />
              ) : (
                <img src={imageURL} alt="stamp" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </div>
          </Grid>
          
          {/* 設定エリア */}
          <Grid item xs={7} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="subtitle1" gutterBottom
                sx={{ marginTop: 2 }}
              >印影タイプ選択</Typography>
              <ToggleButtonGroup
                value={Object.values(stampDialogState.engravingTypeObj)[0] || ''}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) {
                    setStampProps({
                      ...stampProps,
                      engraving_type: Object.keys(stampDialogState.engravingTypesObj).find(key => stampDialogState.engravingTypesObj[key] === newValue) || '',
                    })
                  }
                }}
                aria-label="engraving type"
                sx={{ height: 45 }}
              >
                {Object.entries(stampDialogState.engravingTypesObj).map(([key, value]) => (
                  <ToggleButton key={key} value={value}>{value}</ToggleButton>
                ))}
              </ToggleButtonGroup>

              <Typography variant="subtitle1" gutterBottom
                sx={{ marginTop: 2 }}
              >書体選択</Typography>
              <ToggleButtonGroup
                value={Object.values(stampDialogState.fontObj)[0] || ''}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) {
                    setStampProps({
                      ...stampProps,
                      font: Object.keys(stampDialogState.fontsObj).find(key => stampDialogState.fontsObj[key] === newValue) || '',
                    });
                  }
                }}
                sx={{ height: 95 }}
                aria-label="font type"
              >
                {Object.entries(stampDialogState.fontsObj).map(([key, value]) => (
                  <ToggleButton key={key} value={value}>{value}</ToggleButton>
                ))}
              </ToggleButtonGroup>
              
              <Typography variant="subtitle1" gutterBottom
                sx={{ marginTop: 2, marginBottom: 1 }}
              >印影文字</Typography>
              <Grid container spacing={1} sx={{ height: 45 }}>
                {Object.entries(stampDialogState.textObj).map(([key, value]) => (
                  <Grid item xs={4} key={key}>
                    <TextField
                      label={key}
                      placeholder="文字を入力"
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        setStampDialogState((prev) => ({
                          ...prev,
                          textObj: { ...prev.textObj, [key]: newValue },
                        }));
                      }}
                      fullWidth
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <StampDownloadButton
          width={210}
          height={45}
          buttonText="白背景でダウンロード"
          {
            ...{
              ...stampProps,
              is_advanced: 'false',
            }
          }
        />
        <StampDownloadButton
          width={210}
          height={45}
          buttonText="透過背景でダウンロード"
          {
            ...{
              ...stampProps,
              is_advanced: 'true',
            }
          }
        />
      </DialogActions>
    </Dialog>
  );
};

export default StampDialog;
