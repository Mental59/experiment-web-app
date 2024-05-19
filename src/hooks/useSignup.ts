import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../requests/auth';
import {
  getErrorMessageFromException,
  showDefaultNotification,
  showErrorNotification,
} from '../utils/notifier';

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
      showErrorNotification(`Ошибка при регистрации: ${getErrorMessageFromException(err)}`);
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
