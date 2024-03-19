import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { PasswordInputWithRequirements } from './PasswordInputWithRequirements';
import { LoginInputWithRequirements } from './LoginInputWithRequirements';
import { useAuthentication } from '../../hooks/useAuthentication';

export function AuthenticationTitle() {
  const {
    handleSignin,
    isLoginCorrect,
    isPasswordCorrect,
    setIsLoginCorrect,
    setIsPasswordCorrect,
    setLogin,
    setPassword,
  } = useAuthentication();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Добро пожаловать
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Не зарегистрированы?{' '}
        <Anchor size="sm" component="button">
          Создать учетную запись
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginInputWithRequirements setIsCorrect={setIsLoginCorrect} setLogin={setLogin} />
        <PasswordInputWithRequirements
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
