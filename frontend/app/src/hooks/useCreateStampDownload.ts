import { useState } from "react";
import { apiClient } from "../lib/apiClient";
import { CreateStampDownloadProps, StampDownloadRequest, StampDownloadResponse } from "../types/StampDownload";

export const useCreateStampDownload = () => {
  const [statusDownload, setStatusDownload] = useState<string>('before');
  const [errorMessageDownload, setErrorMessageDownload] = useState<string>('');

  const createStampDownload = async (params: CreateStampDownloadProps) => {
    try {
      setStatusDownload('running');
      const requestPayload: StampDownloadRequest = params;

      const response = await apiClient.post<StampDownloadResponse>(
        '/stamp_downloads',
        requestPayload,
      );

      const status = response.data.errors ? 'error' : 'success';

      setStatusDownload(status);
      setErrorMessageDownload(response.data.errors ? response.data.errors.join(', ') : '');
    } catch (error: any) {
      setStatusDownload('error');
      setErrorMessageDownload(error.message);
    };
  }

  return {
    statusDownload,
    errorMessageDownload,
    createStampDownload,
  }
}
