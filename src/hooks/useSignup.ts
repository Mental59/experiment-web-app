import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { signup } from '../requests/auth';
import { showDefaultNotification, showErrorNotification } from '../utils/notifier';

export const useSignup = () => {
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup({ login, password });
      showDefaultNotification('Регистрация выполнена успешно');
      navigate('/signin');
    } catch (err) {
      const axiosError = err as AxiosError;
      const axiosData = axiosError.response?.data as { detail: { message: string } };
      showErrorNotification(`Ошибка при регистрации: ${axiosData.detail.message ?? axiosError}`);
    }
  };

  return {
    isLoginCorrect,
    setIsLoginCorrect,
    isPasswordCorrect,
    setIsPasswordCorrect,
    setLogin,
    setPassword,
    handleSignup,
  };
};
