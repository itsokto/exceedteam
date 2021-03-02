import { AuthResponse } from 'src/app/types/auth.response';

export interface IAuthState {
  isAuthenticated: boolean;

  auth?: AuthResponse;

  errorMessage?: string;
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false,
  auth: null,
  errorMessage: null,
};
