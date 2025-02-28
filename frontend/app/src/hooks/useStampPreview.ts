import { apiClient } from '../lib/apiClient';
import { StampPreviewResponse, StampPreview } from '../types/StampPreview';
import { StampProps } from '../types/Stamp';

export const useStampPreview = () => {
  const fetchStampPreview = async (params: StampProps): Promise<StampPreview> => {
    try {
      const responseImage = await apiClient.get<StampPreviewResponse>('/stamps/preview', {
        params,
        responseType: 'blob',
      });

      const responseMetadata = await apiClient.get('/stamps/translate', {
        params,
        responseType: 'json',
      });

      return {
        blob: responseImage.data,
        status: true,
        stamp_category: responseMetadata.data.stamp_category,
        stamp_type: responseMetadata.data.stamp_type,
        engraving_type: responseMetadata.data.engraving_type,
        font: responseMetadata.data.font,
        balance: responseMetadata.data.balance,
      }
    } catch (error) {
      return {
        blob: new Blob([]),
        status: false,
        stamp_category: '',
        stamp_type: '',
        engraving_type: '',
        font: '',
        balance: '',
      }
    };
  };

  return {
    fetchStampPreview,
  };
};
