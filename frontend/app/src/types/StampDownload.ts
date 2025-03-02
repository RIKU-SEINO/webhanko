import { StampProps } from './Stamp';

export type CreateStampDownloadProps = StampProps;

export type StampDownloadRequest = StampProps;

export type StampDownloadResponse = { 
  errors: string[] | null;
};