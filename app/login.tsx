import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      showMessage({
        message: "Erro",
        description: "Por favor, preencha todos os campos.",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.0.13:8000/api/login', {
        email: email,
        password: password
      });

      if (response.data.token) {
        showMessage({
          message: "Sucesso",
          description: "Login efetuado com sucesso!",
          type: "success",
        });
        // Se necessário, você pode armazenar o token ou executar outras ações
        // router.replace('/home'); // Descomente se você quiser redirecionar após o login
      } else {
        showMessage({
          message: "Erro",
          description: "Credenciais inválidas, tente novamente.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Erro",
        description: "Ocorreu um erro ao tentar logar.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#F8F9FB",
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
