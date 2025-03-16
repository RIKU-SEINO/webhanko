import { useState, useContext } from 'react';
import { apiClient } from "../lib/apiClient";
import { useCookies } from "react-cookie";
import { CreateStampDownloadProps, CreateStampDownloadRequest, CreateStampDownloadStatus, CreateStampDownloadResponse } from "../types/StampDownload";
import { FlashMessageContext } from '../App';

export const useCreateStampDownload = () => {
  const [createStampDownloadStatus, setCreateStampDownloadStatus] = useState<CreateStampDownloadStatus>('initial');
  const [errorMessageCreateStampDownload, setErrorCreateStampMessageDownload] = useState<string>('');
  const [cookies] = useCookies(['_access_token', '_client', '_uid']);
  const { setFlashMessageSuccess, setFlashMessageError } = useContext(FlashMessageContext);

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
        {
          headers: {
            "access-token": cookies._access_token,
            "client": cookies._client,
            "uid": cookies._uid,
          }
        }
      );

      const status = response.data.errors ? 'error' : 'success';

      setCreateStampDownloadStatus(status);
      setErrorCreateStampMessageDownload(response.data.errors ? response.data.errors.join(', ') : '');
      if (status === 'success') {
        setFlashMessageSuccess('印鑑画像のダウンロードを開始します');
      } else {
        setFlashMessageError(response.data.errors?.join(', ') || '印鑑画像のダウンロードに失敗しました');
        setCreateStampDownloadStatus('error');
      }
    } catch (error: any) {
      setCreateStampDownloadStatus('error');
      setErrorCreateStampMessageDownload(error.message);
      setFlashMessageError('印鑑画像のダウンロードに失敗しました');
    };
  }

  return {
    createStampDownloadStatus,
    errorMessageCreateStampDownload,
    createStampDownload,
  }
}
