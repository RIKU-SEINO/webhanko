import { apiClient } from '../lib/apiClient';
import { StampPreviewResponse, StampMetadataResponse, StampPreview } from '../types/StampPreview';
import { StampProps } from '../types/Stamp';

export const useStampPreview = () => {
  const fetchStampPreview = async (params: StampProps): Promise<StampPreview> => {
    try {
      const responseImage = await apiClient.get<StampPreviewResponse>('/stamps/preview', {
        params,
        responseType: 'blob',
      });

      const responseMetadata = await apiClient.get<StampMetadataResponse>('/stamps/metadata', {
        params,
        responseType: 'json',
      });

      return {
        blob: responseImage.data,
        status: true,
        ...responseMetadata.data,
      }
    } catch (error: any) {
      return {
        blob: new Blob([]),
        status: false,
        stamp_category: {},
        stamp_type: {},
        engraving_type: {},
        font: {},
        text: {},
        is_advanced: 'false',
        balance: {},
        engraving_type_candidates: {},
        font_candidates: {},
        balance_candidates: {},
        errors: error.message,
      }
    };
  };

  return {
    fetchStampPreview,
  };
};
