import { useState } from 'react';
import { apiClient } from "../lib/apiClient";
import { ExecuteStampDownloadProps, ExecuteStampDownloadStatus } from "../types/StampDownload";
import { useStampPreview } from '../hooks/useStampPreview';

export const useExecuteStampDownload = () => {
  const { fetchStampPreview } = useStampPreview();
  const [executeStampDownloadStatus, setExecuteStampDownloadStatus] = useState<ExecuteStampDownloadStatus>('initial');
  const [errorMessageExecuteStampDownload, setErrorExecuteStampMessageDownload] = useState<string>('');

  const executeStampDownload = async (props: ExecuteStampDownloadProps) => {
    setExecuteStampDownloadStatus('loading');

    await fetchStampPreview(props)
      .then((response) => {
        if (response.status === false) return response;

        const blob = response.blob;
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'stamp.png';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        return response;
      })
      .then((response) => {
        const status = response.status ? 'success' : 'error';
        setExecuteStampDownloadStatus(status);
        setErrorExecuteStampMessageDownload(response.errors ? response.errors : '');
      })
  };

  return {
    executeStampDownloadStatus,
    errorMessageExecuteStampDownload,
    executeStampDownload,
  }
}
