import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

export const getErrorMessageFromException = (err: any) => {
  const axiosErr = err as AxiosError;
  const responseData = axiosErr.response?.data as { detail: { message: string } };
  return responseData?.detail?.message ?? axiosErr.message ?? `${err}`;
};

export const showErrorNotification = (message: string) =>
  notifications.show({
    title: 'Ошибка',
    message,
    color: 'red',
  });

export const showDefaultNotification = (message: string) =>
  notifications.show({ title: 'Уведомление', message, color: 'green' });

export const showWarningNotification = (message: string) =>
  notifications.show({ title: 'Предупреждение', message, color: 'yellow' });
