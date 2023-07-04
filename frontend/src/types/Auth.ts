export type User = {
  userId: string;
  nickname: string;
  current: number;
  provider: string;
};

export type Auth = {
  user: User;
  accessToken: string;
};

export type SignInCredencials = {
  userId: string;
  password: string;
};
