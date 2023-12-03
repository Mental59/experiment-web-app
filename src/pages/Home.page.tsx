import { AppShell, Burger, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { ExperimentMenu } from '../components/Experiments/ExperimentMenu/ExperimentMenu';
import { useAppSelector } from '../redux/store';
import { ExperimentMainSection } from '../components/Experiments/ExperimentMainSection/ExperimentMainSection';
import { ExperimentSettingsSection } from '../components/Experiments/ExperimentSettingsSection/ExperimentSettingsSection';

export function HomePage() {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const activeSection = useAppSelector((state) => state.webAppState.activeSection);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !burgerOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group p="sm">
          <Burger opened={burgerOpened} onClick={toggleBurger} hiddenFrom="sm" size="sm" />
          <MantineLogo type="mark" size={30} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ExperimentMenu />
      </AppShell.Navbar>

      <AppShell.Main>
        {activeSection === 'ExperimentsSection' && <ExperimentMainSection />}
        {activeSection === 'ExperimentSettingsSection' && <ExperimentSettingsSection />}
      </AppShell.Main>
    </AppShell>
  );
}
