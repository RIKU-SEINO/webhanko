import React, { useState, useEffect } from 'react';
import {
  StampDownloadButtonProps,
  StampDownloadStatus,
  HandleStampDownloadProps,
  CreateStampDownloadProps,
  ExecuteStampDownloadProps,
} from '../types/StampDownload';
import { useCreateStampDownload } from '../hooks/useCreateStampDownload';
import { useExecuteStampDownload } from '../hooks/useExecuteStampDownload';
import { Button, Typography } from '@mui/material';
import Loading from './Loading';

const StampDownloadButton: React.FC<StampDownloadButtonProps> = ({ buttonText, width, height, ...props }) => {
  const { createStampDownloadStatus, errorMessageCreateStampDownload, createStampDownload } = useCreateStampDownload();
  const { executeStampDownloadStatus, errorMessageExecuteStampDownload, executeStampDownload } = useExecuteStampDownload();

  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);
  const [stampDownloadStatus, setStampDownloadStatus] = useState<StampDownloadStatus>('initial');
  const [errorMessageStampDownload, setErrorMessageStampDownload] = useState<string>('');

  const handleStampDownload = async (props: HandleStampDownloadProps) => {
    setIsLoadingDownload(true);
    setStampDownloadStatus('loading');

    const payloadCreateStampDownload: CreateStampDownloadProps = props;
    await createStampDownload(payloadCreateStampDownload);

    if (createStampDownloadStatus === 'error') {
      setStampDownloadStatus('error');
      setIsLoadingDownload(false);
      setErrorMessageStampDownload(errorMessageCreateStampDownload);
      return;
    }

    const payloadExecuteStampDownload: ExecuteStampDownloadProps = props;
    await executeStampDownload(payloadExecuteStampDownload);

    if (executeStampDownloadStatus === 'error') {
      setStampDownloadStatus('error');
      setIsLoadingDownload(false);
      setErrorMessageStampDownload(errorMessageExecuteStampDownload);
      return;
    }

    setStampDownloadStatus('success');
    setIsLoadingDownload(false);
  };

  return (
    <Button
      sx={{ marginRight: 2, width: width, height: height }}
      variant="contained"
      color="inherit"
      onClick={() => handleStampDownload(props)}
      disabled={isLoadingDownload}
    >
      {isLoadingDownload ? (
        <Loading width={width} height={height} />
      ) : (
        <Typography>{buttonText}</Typography>
      )}
    </Button>
  );
};

export default StampDownloadButton;
