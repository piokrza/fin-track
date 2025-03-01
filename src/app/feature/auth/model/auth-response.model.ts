import { AuthMethods, UserResponse } from '#auth/model';

export interface AuthResponse {
  status: number;
  data: {
    user: UserResponse;
    methods: AuthMethods[];
  };
  meta: {
    is_authenticated: boolean;
    session_token: string;
  };
}
