import { notifications } from '@mantine/notifications';

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
