import type { User } from "../models";

interface LoginResponseDTO {
  token: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

interface RegisterResponseDTO {
  token: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

interface GenerateRefreshTokenResponseDTO {
  token: string;
  refreshToken: string;
}

export type {
  LoginResponseDTO,
  RegisterResponseDTO,
  GenerateRefreshTokenResponseDTO,
};
