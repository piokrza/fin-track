export interface UserResponse {
  id: number;
  email: string;
  display: string;
  username: string;
  has_usable_password: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
}
