import { StampProps } from './Stamp';

// 印鑑ダウンロードボタンに渡すprops
export interface StampDownloadButtonProps extends StampProps {
  width: number; // ボタンの幅
  height: number; // ボタンの高さ
  buttonText: string; // ボタンのテキスト
};

// 印鑑ダウンロードの状態
export type StampDownloadStatus = 'initial' | 'loading' | 'success' | 'error';

// 印鑑ダウンロード関数に渡すprops
export type HandleStampDownloadProps = StampProps;

// 印鑑ダウンロード履歴を作成するフックに渡すprops
export type CreateStampDownloadProps = StampProps;

// 印鑑ダウンロード履歴作成の状態
export type CreateStampDownloadStatus = 'initial' | 'loading' | 'success' | 'error';

// 印鑑ダウンロード履歴を取得するバックエンドAPIのリクエスト
export type CreateStampDownloadRequest = StampProps;

// 印鑑ダウンロード履歴を取得するバックエンドAPIのレスポンス
export type CreateStampDownloadResponse = { 
  errors: string[] | null;
};

// 印鑑ダウンロード実行のprops
export type ExecuteStampDownloadProps = StampProps;

// 印鑑ダウンロード実行の状態
export type ExecuteStampDownloadStatus = 'initial' | 'loading' | 'success' | 'error';