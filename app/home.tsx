import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/services/supabase';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        // Se não houver sessão, redireciona para a tela de login
        router.replace('/login');
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login'); // Redireciona para a tela de login após logout
  };

  const goToTasks = () => {
    router.push('/tasks'); // Redireciona para a tela de tarefas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home</Text>
      <View style={styles.buttonContainer}>
        <Button title="Tarefas" onPress={goToTasks} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-between', // Adiciona espaço entre os botões
    width: '60%', // Define uma largura para o contêiner dos botões
  },
  button: {
    flex: 1,
    marginHorizontal: 10, // Adiciona espaço entre os botões
  },
});
