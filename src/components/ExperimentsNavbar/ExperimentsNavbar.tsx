import { useEffect, useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconHome2, IconMicroscope, IconSettings } from '@tabler/icons-react';
import classes from './ExperimentsNavbar.module.css';
import { ExperimentsSection } from '../sections/ExperimentsSection/ExperimentsSection';
import { NeptuneExperimentSettingsSection } from '../sections/NeptuneExperimentSettingsSection/NeptuneExperimentSettingsSection';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  section: React.ReactNode;
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
  { icon: IconMicroscope, label: 'Эксперименты', section: <ExperimentsSection /> },
  {
    icon: IconSettings,
    label: 'Настройка Neptune',
    section: <NeptuneExperimentSettingsSection />,
  },
];

export function ExperimentsNavbar({
  onSectionChanged,
}: {
  onSectionChanged: (section: React.ReactNode) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    onSectionChanged(navbarData[activeIndex].section);
  }, []);

  const links = navbarData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activeIndex}
      onClick={() => {
        setActiveIndex(index);
        onSectionChanged(link.section);
      }}
    />
  ));

  return <Stack justify="center">{links}</Stack>;
}
