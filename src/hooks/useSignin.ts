import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { signin } from '../requests/auth';
import { setToken } from '../redux/webAppState/webAppStateSlice';
import { showDefaultNotification, showErrorNotification } from '../utils/notifier';

export const useSignin = () => {
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const token = await signin({ login, password });
      dispatch(setToken(token));
      showDefaultNotification('Вход выполнен успешно');
      navigate('/');
    } catch (err) {
      const axiosError = err as AxiosError;
      const axiosData = axiosError.response?.data as { detail: { message: string } };
      showErrorNotification(`Ошибка при входе: ${axiosData.detail.message ?? axiosError}`);
    }
  };

  return {
    isLoginCorrect,
    setIsLoginCorrect,
    isPasswordCorrect,
    setIsPasswordCorrect,
    setLogin,
    setPassword,
    handleSignin,
  };
};
