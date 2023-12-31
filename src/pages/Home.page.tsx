import { AppShell, Burger, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { ExperimentMenu } from '../components/Experiments/ExperimentMenu/ExperimentMenu';
import { ExperimentMainSection } from '../components/Experiments/ExperimentMainSection/ExperimentMainSection';
import { ExperimentSettingsSection } from '../components/Experiments/ExperimentSettingsSection/ExperimentSettingsSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { LinksSection } from '../components/Experiments/LinksSection/LinksSection';

export function HomePage() {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const { activeSection } = useActiveSection();

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
        {activeSection === 'Links' && <LinksSection />}
      </AppShell.Main>
    </AppShell>
  );
}
