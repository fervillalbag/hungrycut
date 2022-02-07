export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  description: string;
  password: string;
  avatar: string;
  role: string;
  createdAt: string;
};

export type RegisterInputType = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export type CreateUserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};
