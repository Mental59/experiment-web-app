import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconHome2, IconMicroscope, IconSettings } from '@tabler/icons-react';
import classes from './ExperimentsMenu.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  ExperimentActiveSection,
  setActiveSectionIndex,
} from '../../../redux/experimentsMenuSection/experimentsMenuSectionSlice';

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
    label: 'Настройка Neptune',
    section: 'NeptuneExperimentSettingsSection',
  },
];

export function ExperimentsMenu() {
  const activeSection = useAppSelector((state) => state.experimentMenuSection.activeSection);
  const dispatch = useAppDispatch();

  const links = navbarData.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.section === activeSection}
      onClick={() => {
        dispatch(setActiveSectionIndex(link.section));
      }}
    />
  ));

  return <Stack justify="center">{links}</Stack>;
}
