import { User } from "./user.interface";

export interface AuthResponse {
  token: string;
  nombre: string;
  email: string;
  foto: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}
