import axios from 'axios';
import { API_URL } from '../constants';
import type { SigninDto, SignupDto, TokenDto, UserDto } from '../models/auth/auth.type';

export const signup = async (signupData: SignupDto) => {
  const response = await axios.post<UserDto>(`${API_URL}/auth/signup`, signupData);
  return response.data;
};

export const signin = async (signinData: SigninDto) => {
  const response = await axios.post<TokenDto>(`${API_URL}/auth/signin`, signinData);
  return response.data;
};

export const whoami = async () => {
  const response = await axios.get<UserDto>(`${API_URL}/auth/whoami`);
  return response.data;
};
