import type { User } from "../models";

interface LoginResponseDTO {
  token: string;
  user: Omit<User, "password">;
}

interface RegisterResponseDTO {
  token: string;
  user: Omit<User, "password">;
}

export type { LoginResponseDTO, RegisterResponseDTO };
