export type User = {
  email: string;
  username: string;
  current: number;
  provider: string;
};

export type Auth = {
  user: User;
  expired: number;
  accessToken: string;
};

export type SignInCredencials = {
  email: string;
  password: string;
};
