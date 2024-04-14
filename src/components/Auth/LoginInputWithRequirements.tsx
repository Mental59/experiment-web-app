import { useState } from 'react';
import { Popover, TextInput } from '@mantine/core';
import { Requirement } from './Requirement';

const meetsCriteria = (value: string) => value.length >= 4;

export type LoginInputWithRequirementsProps = {
  setIsCorrect: (value: boolean) => void;
  setLogin: (value: string) => void;
  showRequirementDropDown: boolean;
};
export function LoginInputWithRequirements({
  setIsCorrect,
  setLogin,
  showRequirementDropDown,
}: LoginInputWithRequirementsProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');

  const handleLoginChange = (login: string) => {
    setValue(login);
    setLogin(login);
    setIsCorrect(meetsCriteria(login));
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
          <TextInput
            withAsterisk
            required
            maxLength={50}
            label="Логин"
            placeholder="Ваш логин"
            value={value}
            onChange={(event) => handleLoginChange(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      {showRequirementDropDown && (
        <Popover.Dropdown>
          <Requirement label="Содержит 4 символа" meets={meetsCriteria(value)} />
        </Popover.Dropdown>
      )}
    </Popover>
  );
}
