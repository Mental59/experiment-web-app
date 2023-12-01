import { useDisclosure } from '@mantine/hooks';
import { Anchor, AppShell, Burger, Stack, TextInput } from '@mantine/core';
import { MainTabs } from '../MainTabs/MainTabs';

export function Main() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Anchor>MLflow</Anchor>
        <Anchor>Neptune</Anchor>
      </AppShell.Navbar>

      <AppShell.Aside>
        <Stack pl="md" pr="md">
          <TextInput label="Название проекта" />
        </Stack>
      </AppShell.Aside>

      <AppShell.Main>
        <MainTabs />
      </AppShell.Main>
    </AppShell>
  );
}
