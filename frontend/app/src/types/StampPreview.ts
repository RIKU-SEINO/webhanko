export type StampPreviewResponse = Blob;

export type JsonObject = { [key: string]: string };

export type StampMetadataResponse = {
  stamp_category: JsonObject;
  stamp_type: JsonObject;
  engraving_type: JsonObject;
  font: JsonObject;
  text: JsonObject;
  is_advanced: string;
  balance: JsonObject;
  engraving_type_candidates: JsonObject;
  font_candidates: JsonObject;
  balance_candidates: JsonObject;
};

export interface StampPreview extends StampMetadataResponse {
  blob: StampPreviewResponse;
  status: boolean;
  errors?: string;
}
