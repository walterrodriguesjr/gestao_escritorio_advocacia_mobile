import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import App from './App';
import { supabase } from '@/services/supabase';

export default function TasksScreen() {
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

  return <App />;
}
