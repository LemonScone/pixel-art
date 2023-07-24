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

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpParams = SignInCredentials & { username: string };
