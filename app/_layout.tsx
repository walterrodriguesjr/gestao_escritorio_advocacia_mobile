import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Recuperar Senha' }} />
    </Stack>
  );
}
