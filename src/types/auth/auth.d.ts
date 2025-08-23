// Auth module example
declare module "@controllers/auth/auth.controller" {
  import { RequestHandler } from "express";

  export const login: RequestHandler;
  export const register: RequestHandler;
  export const logout: RequestHandler;
}

declare module "@services/auth/auth.service" {
  interface AuthService {
    login(email: string, password: string): Promise<{ token: string }>;
    register(userData: any): Promise<{ id: string }>;
    logout(token: string): Promise<void>;
  }

  const authService: AuthService;
  export default authService;
}
