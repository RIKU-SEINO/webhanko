export type StampPreviewResponse = Blob;

export type StampMetadataResponse = JSON;

export interface StampPreview {
  blob: StampPreviewResponse;
  status: boolean;
  stamp_category: string;
  stamp_type: string;
  engraving_type: string;
  font: string;
  balance: string;
}
