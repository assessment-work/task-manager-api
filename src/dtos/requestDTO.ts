interface LoginRequestDTO {
  email: string;
  password: string;
}

interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
}

export type { LoginRequestDTO, RegisterRequestDTO };
