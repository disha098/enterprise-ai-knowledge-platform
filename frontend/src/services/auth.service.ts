import api from "../api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterRequest) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};