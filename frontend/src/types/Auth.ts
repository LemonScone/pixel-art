export type User = {
  userId: string;
  nickname: string;
  current: number;
  provider: string;
};

export type Auth = {
  user: User;
  expired: number;
  accessToken: string;
};

export type SignInCredencials = {
  userId: string;
  password: string;
};
