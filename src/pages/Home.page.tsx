import { AppShell, Burger, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ExperimentsNavbar } from '../components/ExperimentsNavbar/ExperimentsNavbar';

export function HomePage() {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const [activeSection, setActiveSection] = useState<React.ReactNode>(<div>Default</div>);

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
        <ExperimentsNavbar onSectionChanged={(section) => setActiveSection(section)} />
      </AppShell.Navbar>

      <AppShell.Main>{activeSection}</AppShell.Main>
    </AppShell>
  );
}
