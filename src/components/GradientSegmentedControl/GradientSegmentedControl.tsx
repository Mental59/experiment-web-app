import { SegmentedControl, SegmentedControlProps } from '@mantine/core';
import classes from './GradientSegmentedControl.module.css';

export function GradientSegmentedControl(props: SegmentedControlProps) {
  return <SegmentedControl radius="xl" size="md" classNames={classes} {...props} />;
}
