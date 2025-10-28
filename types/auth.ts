export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string; // Optional - stored in HttpOnly cookie, not returned in response body
  username: string;
  email: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface AuthError {
  message: string;
  field?: string;
}
