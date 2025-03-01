import { AuthMethods, User } from '#auth/model';

export interface AuthResponse {
  status: number;
  data: {
    user: User;
    methods: AuthMethods[];
  };
  meta: {
    is_authenticated: boolean;
    session_token: string;
  };
}
