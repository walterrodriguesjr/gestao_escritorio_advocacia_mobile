import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { supabase } from '@/services/supabase';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (email.trim() === '') {
      showMessage({
        message: 'Erro',
        description: 'Por favor, insira seu email.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        showMessage({
          message: 'Erro',
          description: error.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Sucesso',
          description: 'Um link para redefinir sua senha foi enviado para seu email.',
          type: 'success',
        });
        router.push('/login'); // Redireciona de volta para a tela de login
      }
    } catch (error) {
      if (error instanceof Error) {
        showMessage({
          message: 'Erro',
          description: error.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Erro',
          description: 'Ocorreu um erro desconhecido',
          type: 'danger',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <Button title={loading ? 'Enviando...' : 'Enviar'} onPress={handlePasswordReset} disabled={loading} />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});
