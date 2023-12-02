import { AppShell, Burger, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { ExperimentsMenu } from '../components/Experiments/ExperimentsMenu/ExperimentsMenu';
import { useAppSelector } from '../redux/store';
import { ExperimentsSection } from '../components/Experiments/ExperimentsSection/ExperimentsSection';
import { NeptuneExperimentSettingsSection } from '../components/Experiments/NeptuneExperimentSettingsSection/NeptuneExperimentSettingsSection';

export function HomePage() {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const activeSection = useAppSelector((state) => state.experimentMenuSection.activeSection);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !burgerOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group p="sm">
          <Burger opened={burgerOpened} onClick={toggleBurger} hiddenFrom="sm" size="sm" />
          <MantineLogo type="mark" size={30} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ExperimentsMenu />
      </AppShell.Navbar>

      <AppShell.Main>
        {activeSection === 'ExperimentsSection' && <ExperimentsSection />}
        {activeSection === 'NeptuneExperimentSettingsSection' && (
          <NeptuneExperimentSettingsSection />
        )}
      </AppShell.Main>
    </AppShell>
  );
}
