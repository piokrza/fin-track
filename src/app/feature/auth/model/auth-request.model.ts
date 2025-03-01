export interface SignupRequest {
  email: string;
  username: string;
  password: string;
}

export type LoginRequest = Omit<SignupRequest, 'username'>;
