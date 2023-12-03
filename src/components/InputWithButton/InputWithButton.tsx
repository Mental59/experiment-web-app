import { TextInput, ActionIcon, useMantineTheme, rem, TextInputProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export type InputWithButtonProps = TextInputProps & {
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function InputWithButton({ onButtonClick, ...textInputProps }: InputWithButtonProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={(event) => onButtonClick(event)}
        >
          <IconCheck style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...textInputProps}
    />
  );
}
