import { User } from "./user.interface";

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}
