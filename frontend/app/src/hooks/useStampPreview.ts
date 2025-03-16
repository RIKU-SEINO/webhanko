import { useContext } from 'react';
import { apiClient } from '../lib/apiClient';
import { StampPreviewRequest,
          StampPreviewResponse,
          StampMetadataRequest,
          StampMetadataResponse,
          StampPreview,
} from '../types/StampPreview';
import { StampProps } from '../types/Stamp';
import { useCookies } from "react-cookie";
import { FlashMessageContext } from '../App';

export const useStampPreview = () => {
  const [cookies] = useCookies(['_access_token', '_client', '_uid']);
  const { setFlashMessageError } = useContext(FlashMessageContext);
  const fetchStampPreview = async (props: StampProps): Promise<StampPreview> => {

    const stampPreviewPayload: StampMetadataRequest = {
      ...props,
      text_1: props.text[0] || '',
      text_2: props.text[1] || '',
      text_3: props.text[2] || '',
    };

    const stampMetadataPayload: StampPreviewRequest = {
      ...props,
      text_1: props.text[0] || '',
      text_2: props.text[1] || '',
      text_3: props.text[2] || '',
    };

    try {
      const responseImage = await apiClient.get<StampPreviewResponse>('/stamps/preview', {
        params: stampPreviewPayload,
        responseType: 'blob',
        headers: {
          "access-token": cookies._access_token,
          "client": cookies._client,
          "uid": cookies._uid,
        },
      });

      const responseMetadata = await apiClient.get<StampMetadataResponse>('/stamps/metadata', {
        params: stampMetadataPayload,
        responseType: 'json',
        headers: {
          "access-token": cookies._access_token,
          "client": cookies._client,
          "uid": cookies._uid,
        },
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
