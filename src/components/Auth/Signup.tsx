import { Container, Title, Paper, Button, Anchor, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';
import { useSignup } from '../../hooks/useSignup';
import { LoginInputWithRequirements } from './LoginInputWithRequirements';
import { PasswordInputWithRequirements } from './PasswordInputWithRequirements';

export function Registration() {
  const {
    isLoginCorrect,
    handleSignup,
    isPasswordCorrect,
    setIsLoginCorrect,
    setIsPasswordCorrect,
    setLogin,
    setPassword,
  } = useSignup();
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Регистрация
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Уже зарегистрированы?{' '}
        <Anchor onClick={() => navigate('/signin')} size="sm" component="button">
          Вернуться на страницу входа
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
          onClick={handleSignup}
          disabled={!isLoginCorrect || !isPasswordCorrect}
        >
          Зарегистрироваться
        </Button>
      </Paper>
    </Container>
  );
}
