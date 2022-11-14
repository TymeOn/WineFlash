export interface AuthResponse {
  user: {
    id: number;
    username: string;
    password: string;
    admin: boolean;
    token: string;
    refresh: number;
  };
}
