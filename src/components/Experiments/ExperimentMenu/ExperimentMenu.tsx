import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconHome2, IconLink, IconMicroscope, IconSettings } from '@tabler/icons-react';
import classes from './ExperimentMenu.module.css';
import type { ExperimentActiveSection } from '../../../models/experiment/section.type';
import { useActiveSection } from '../../../hooks/useActiveSection';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  section: ExperimentActiveSection;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, section }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const navbarData: NavbarLinkProps[] = [
  { icon: IconMicroscope, label: 'Эксперименты', section: 'ExperimentsSection' },
  {
    icon: IconSettings,
    label: 'Настройки',
    section: 'ExperimentSettingsSection',
  },
  {
    icon: IconLink,
    label: 'Ссылки',
    section: 'Links',
  },
];

export function ExperimentMenu() {
  const { activeSection, setActiveSection } = useActiveSection();

  const links = navbarData.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.section === activeSection}
      onClick={() => {
        setActiveSection(link.section);
      }}
    />
  ));

  return <Stack justify="center">{links}</Stack>;
}
