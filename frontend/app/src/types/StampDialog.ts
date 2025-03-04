import { StampProps } from './Stamp';

export interface StampDialogState extends StampProps {
  stampCategoryObj: { [key: string]: string };
  stampTypeObj: { [key: string]: string };
  engravingTypeObj: { [key: string]: string };
  fontObj: { [key: string]: string };
  textObj: { [key: string]: string };
  engravingTypesObj: { [key: string]: string };
  fontsObj: { [key: string]: string };
}

export interface StampDialogProps {
  open: boolean;
  onClose: () => void;
  props: StampProps;
  state: StampDialogState;
  imageUrl: string;
}