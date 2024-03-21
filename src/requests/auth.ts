import axios from 'axios';
import { API_URL } from '../constants';
import type { SigninDto, SignupDto, TokenDto, UserDto } from '../models/auth/auth.type';
import { createAuthHeader } from '../utils/headers';

export const signup = async (signupData: SignupDto) => {
  const response = await axios.post<UserDto>(`${API_URL}/auth/signup`, signupData);
  return response.data;
};

export const signin = async (signinData: SigninDto) => {
  const response = await axios.post<TokenDto>(`${API_URL}/auth/signin`, signinData);
  return response.data;
};

export const whoami = async (token: string) => {
  const response = await axios.get<UserDto>(`${API_URL}/auth/whoami`, {
    headers: createAuthHeader(token),
  });
  return response.data;
};
