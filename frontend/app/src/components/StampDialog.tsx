import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StampProps } from '../types/Stamp';
import { useStampPreview } from '../hooks/useStampPreview';
import Loading from './Loading';

interface StampDialogProps {
  open: boolean;
  onClose: () => void;
  props: StampProps;
}

const StampDialog: React.FC<StampDialogProps> = ({ open, onClose, props }) => {
  const { fetchStampPreview } = useStampPreview();
  const [imageURL, setImageURL] = useState<string>('');
  const [stampCategory, setStampCategory] = useState<string>('');
  const [stampType, setStampType] = useState<string>('');
  const [engravingType, setEngravingType] = useState<{ [key: string]: string }>({});
  const [font, setFont] = useState<{ [key: string]: string }>({});
  const [text, setText] = useState<{ [key: string]: string }>({});
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  const [isLoadingEngravingTypes, setIsLoadingEngravingTypes] = useState<boolean>(false);
  const [isLoadingFonts, setIsLoadingFonts] = useState<boolean>(false);
  const [isLoadingText, setIsLoadingText] = useState<boolean>(false);
  const [isLoadingImageFile, setIsLoadingImageFile] = useState<boolean>(false);
  const [isLoadingAdvancedImageFile, setIsLoadingAdvancedImageFile] = useState<boolean>(false);
  
  const [engravingTypes, setEngravingTypes] = useState<{ [key: string]: string }>({});
  const [fonts, setFonts] = useState<{ [key: string]: string }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  {/* 1. ダイアログを開いた時 */}
  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoadingPreview(true);
      setIsLoadingEngravingTypes(true);
      setIsLoadingFonts(true);
      setIsLoadingText(true);
      setIsLoadingImageFile(true);
      setIsLoadingAdvancedImageFile(true);
      try {
        const preview = await fetchStampPreview(props);
        setStampCategory(preview.stamp_category[props.stamp_category]);
        setStampType(preview.stamp_type[props.stamp_type]);
        setEngravingType(preview.engraving_type);
        setFont(preview.font);
        setText(preview.text);
        setEngravingTypes(preview.engraving_type_candidates);
        setFonts(preview.font_candidates);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingEngravingTypes(false);
        setIsLoadingFonts(false);
      }
    };

    if (open) fetchPreview();
  }, [open]);

  {/* 2. フォントまたはテキストが変更された時 */}
  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoadingPreview(true);
      setIsLoadingText(true);
      setIsLoadingImageFile(true);
      setIsLoadingAdvancedImageFile(true);
      try {
        const preview = await fetchStampPreview({
          ...props, 
          text_1: Object.values(text)[0] || '',
          text_2: Object.values(text)[1] || '',
          text_3: Object.values(text)[2] || '',
          engraving_type: Object.keys(engravingType)[0] || props.engraving_type,
          font: Object.keys(font)[0] || props.font,
        });
        const blob = preview.blob;
        const url = URL.createObjectURL(blob);
        setImageURL(url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingPreview(false);
        setIsLoadingText(false);
        setIsLoadingImageFile(false);
        setIsLoadingAdvancedImageFile(false);
      }
    };
  
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (open) fetchPreview();
    }, 500);
  
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [font, Object.values(text).join('')]);

  {/* 3. 印影タイプが変更された時 */}
  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoadingPreview(true);
      setIsLoadingImageFile(true);
      setIsLoadingAdvancedImageFile(true);
      try {
        const preview = await fetchStampPreview({
          ...props,
          text_1: Object.values(text)[0] || '',
          text_2: Object.values(text)[1] || '',
          text_3: Object.values(text)[2] || '',
          engraving_type: Object.keys(engravingType)[0] || props.engraving_type,
          font: Object.keys(font)[0] || props.font,
        });
        const blob = preview.blob;
        const url = URL.createObjectURL(blob);
        setImageURL(url);
        setText(preview.text);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingPreview(false);
        setIsLoadingText(false);
        setIsLoadingImageFile(false);
        setIsLoadingAdvancedImageFile(false);
      }
    };
  
    if (open) fetchPreview();
  }
  , [engravingType]);

  const handleDownload = async (isAdvanced: boolean) => {
    if (isAdvanced) {
      setIsLoadingAdvancedImageFile(true);
    } else {
      setIsLoadingImageFile(true);
    }

    const a = document.createElement('a');
    a.download = `${stampCategory}_${stampType}_${new Date().toISOString()}.png`;
    a.href = imageURL;

    if (isAdvanced) {
      try {
        const preview = await fetchStampPreview({
          ...props,
          text_1: Object.values(text)[0] || '',
          text_2: Object.values(text)[1] || '',
          text_3: Object.values(text)[2] || '',
          engraving_type: Object.keys(engravingType)[0] || props.engraving_type,
          font: Object.keys(font)[0] || props.font,
          is_advanced: 'true',
        });
        const blob = preview.blob;
        a.href = URL.createObjectURL(blob);
      } catch (error) {
        console.error(error);
      }
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsLoadingImageFile(false);
    setIsLoadingAdvancedImageFile(false);
  };


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
                <Typography variant="body2">Loading...</Typography>
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
              {isLoadingEngravingTypes ? (
                <Loading
                  width={240}
                  height={45}
                />
              ) : (
                <ToggleButtonGroup
                  value={Object.values(engravingType)[0] || ''}
                  exclusive
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      const newKey = Object.keys(engravingTypes).find(key => engravingTypes[key] === newValue);
                      setEngravingType({ [newKey || '']: newValue });
                    }
                  }}
                  aria-label="engraving type"
                  sx={{ height: 45 }}
                >
                  {Object.entries(engravingTypes).map(([key, value]) => (
                    <ToggleButton key={key} value={value}>{value}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}

              <Typography variant="subtitle1" gutterBottom
                sx={{ marginTop: 2 }}
              >書体選択</Typography>
              {isLoadingFonts ? (
                <Loading
                  width={240}
                  height={95}
                />
              ) : (
                <ToggleButtonGroup
                  value={Object.values(font)[0] || ''}
                  exclusive
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      const newKey = Object.keys(fonts).find(key => fonts[key] === newValue);
                      setFont({ [newKey || '']: newValue });
                    }
                  }}
                  sx={{ height: 95 }}
                  aria-label="font type"
                >
                  {Object.entries(fonts).map(([key, value]) => (
                    <ToggleButton key={key} value={value}>{value}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
              
              <Typography variant="subtitle1" gutterBottom
                sx={{ marginTop: 2, marginBottom: 1 }}
              >印影文字</Typography>
              {isLoadingText ? (
                <Loading
                  width={240}
                  height={45}
                />  
              ) : (
                <Grid container spacing={1} sx={{ height: 45 }}>
                  {Object.entries(text).map(([key, value]) => (
                    <Grid item xs={4} key={key}>
                      <TextField
                        label={key}
                        value={value}
                        onChange={(e) => setText({ ...text, [key]: e.target.value })}
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          sx={{ marginRight: 2, width: 210, height: 45 }}
          variant="contained"
          color="inherit"
          onClick={() => handleDownload(false)}
        >
          {isLoadingImageFile ? (
            <Loading
              width={210}
              height={45}
            />
          ) : (
            <Typography>白背景でダウンロード</Typography>
          )}
        </Button>
        <Button
          sx={{ marginRight: 2, width: 210, height: 45 }}
          variant="contained"
          color="inherit"
          onClick={() => handleDownload(true)}
        >
          {isLoadingAdvancedImageFile ? (
            <Loading
              width={210}
              height={45}
            />
          ) : (
            <Typography>透過背景でダウンロード</Typography>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StampDialog;
