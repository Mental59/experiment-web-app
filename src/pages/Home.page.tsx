import { Anchor, AppShell, Burger, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ExperimentMenu } from '../components/Experiments/ExperimentMenu/ExperimentMenu';
import { ExperimentMainSection } from '../components/Experiments/ExperimentMainSection/ExperimentMainSection';
import { ExperimentSettingsSection } from '../components/Experiments/ExperimentSettingsSection/ExperimentSettingsSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { LinksSection } from '../components/Experiments/LinksSection/LinksSection';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { whoami } from '../requests/auth';
import { setToken } from '../redux/webAppState/webAppStateSlice';

export function HomePage() {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const { activeSection } = useActiveSection();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.webAppState.token);
  const dispatch = useAppDispatch();

  const tryLogin = async () => {
    try {
      await whoami(token);
    } catch {
      navigate('/signin');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    } else {
      tryLogin();
    }
  });

  const handleLogout = () => {
    dispatch(setToken(null));
    navigate('/signin');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !burgerOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between">
          <Group p="sm">
            <Burger opened={burgerOpened} onClick={toggleBurger} hiddenFrom="sm" size="sm" />
            <MantineLogo type="mark" size={30} />
          </Group>
          <Anchor p="sm" onClick={handleLogout}>
            Выйти
          </Anchor>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ExperimentMenu />
      </AppShell.Navbar>

      <AppShell.Main>
        {activeSection === 'ExperimentsSection' && <ExperimentMainSection />}
        {activeSection === 'ExperimentSettingsSection' && <ExperimentSettingsSection />}
        {activeSection === 'Links' && <LinksSection />}
      </AppShell.Main>
    </AppShell>
  );
}
