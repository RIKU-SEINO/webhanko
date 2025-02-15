export type User = Pick<
  UserResponse,
  'id' | 'email'
>;

export interface UserResponse {
  id: number;
  email: string;
};