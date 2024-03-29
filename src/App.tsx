import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { store } from './redux/store';
import '@mantine/notifications/styles.css';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ReduxProvider store={store}>
        <Notifications position="top-right" zIndex={1000} limit={5} autoClose={10000} />
        <Router />
      </ReduxProvider>
    </MantineProvider>
  );
}
