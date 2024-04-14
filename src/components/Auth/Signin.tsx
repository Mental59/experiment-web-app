import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Signin.module.css';
import { PasswordInputWithRequirements } from './PasswordInputWithRequirements';
import { LoginInputWithRequirements } from './LoginInputWithRequirements';
import { useSignin } from '../../hooks/useSignin';

export function Signin() {
  const {
    handleSignin,
    isLoginCorrect,
    isPasswordCorrect,
    setIsLoginCorrect,
    setIsPasswordCorrect,
    setLogin,
    setPassword,
  } = useSignin();
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Добро пожаловать
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Не зарегистрированы?{' '}
        <Anchor onClick={() => navigate('/signup')} size="sm" component="button">
          Создать учетную запись
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginInputWithRequirements
          showRequirementDropDown={false}
          setIsCorrect={setIsLoginCorrect}
          setLogin={setLogin}
        />
        <PasswordInputWithRequirements
          showRequirementDropDown={false}
          setIsCorrect={setIsPasswordCorrect}
          setPassword={setPassword}
        />
        <Button
          fullWidth
          mt="xl"
          onClick={handleSignin}
          disabled={!isLoginCorrect || !isPasswordCorrect}
        >
          Войти
        </Button>
      </Paper>
    </Container>
  );
}
