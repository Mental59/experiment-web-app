import { useState } from 'react';
import { PasswordInput, Popover } from '@mantine/core';
import { Requirement } from './Requirement';

const meetsCriteria = (value: string) => value.length >= 6;

export type PasswordInputWithRequirementsProps = {
  setIsCorrect: (value: boolean) => void;
  setPassword: (value: string) => void;
};
export function PasswordInputWithRequirements({
  setIsCorrect,
  setPassword,
}: PasswordInputWithRequirementsProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');

  const handlePasswordChange = (password: string) => {
    setValue(password);
    setPassword(password);
    setIsCorrect(meetsCriteria(password));
  };

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            required
            maxLength={100}
            mt="md"
            label="Пароль"
            placeholder="Ваш пароль"
            value={value}
            onChange={(event) => handlePasswordChange(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Requirement label="Содержит 6 символов" meets={meetsCriteria(value)} />
      </Popover.Dropdown>
    </Popover>
  );
}
