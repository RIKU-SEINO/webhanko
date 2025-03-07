import { useState } from 'react';
import { apiClient } from "../lib/apiClient";
import { CreateStampDownloadProps, CreateStampDownloadRequest, CreateStampDownloadStatus, CreateStampDownloadResponse } from "../types/StampDownload";

export const useCreateStampDownload = () => {
  const [createStampDownloadStatus, setCreateStampDownloadStatus] = useState<CreateStampDownloadStatus>('initial');
  const [errorMessageCreateStampDownload, setErrorCreateStampMessageDownload] = useState<string>('');

  const createStampDownload = async (params: CreateStampDownloadProps) => {
    try {
      setCreateStampDownloadStatus('loading');
      const requestPayload: CreateStampDownloadRequest = {
        ...params,
        text_1: params.text[0] || '',
        text_2: params.text[1] || '',
        text_3: params.text[2] || '',
      }

      const response = await apiClient.post<CreateStampDownloadResponse>(
        '/stamp_downloads',
        requestPayload,
      );

      const status = response.data.errors ? 'error' : 'success';

      setCreateStampDownloadStatus(status);
      setErrorCreateStampMessageDownload(response.data.errors ? response.data.errors.join(', ') : '');
    } catch (error: any) {
      setCreateStampDownloadStatus('error');
      setErrorCreateStampMessageDownload(error.message);
    };
  }

  return {
    createStampDownloadStatus,
    errorMessageCreateStampDownload,
    createStampDownload,
  }
}
