export type SignupDto = {
  login: string;
  password: string;
};

export type SigninDto = {
  login: string;
  password: string;
};

export type UserDto = {
  id: string;
  login: string;
};

export type TokenDto = {
  access_token: string;
  token_type: 'bearer';
};
