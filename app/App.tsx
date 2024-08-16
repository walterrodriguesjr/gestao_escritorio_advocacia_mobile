import React, { useEffect, useState } from 'react';
import { Button, ScrollView, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '@/services/supabase';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export default function App() {

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);  // Estado para gerenciar o spinner

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setTasks(data as Task[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (task: string) => {
    if (task.trim() === "") {
      showMessage({
        message: "Campo vazio",
        description: "Por favor, digite uma tarefa antes de adicionar.",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("tasks").insert({ task, completed: false });
      if (error) throw error;

      setNewTask(""); // Limpa o campo de digitação
      await fetchTasks(); // Atualiza a lista de tarefas

      showMessage({
        message: "Sucesso!",
        description: "A tarefa foi adicionada.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("tasks").delete().match({ id });
      if (error) throw error;

      await fetchTasks();
      showMessage({
        message: "Sucesso!",
        description: "A tarefa foi deletada.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, completed: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("tasks").update({ completed }).match({ id });
      if (error) throw error;

      await fetchTasks();
      showMessage({
        message: "Sucesso!",
        description: "A tarefa foi atualizada.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Carregando...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Text style={styles.title}>Adicione uma nova tarefa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui..."
          onChangeText={(text) => setNewTask(text)}
          value={newTask}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddTask(newTask)}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {tasks.map((task) => (
          <View style={styles.task} key={task.id}>
            <Text style={[styles.textTask, task.completed && styles.completed]}>{task.task}</Text>
            <View style={styles.taskActions}>
              <TouchableOpacity onPress={() => updateTask(task.id, !task.completed)}>
                <Text style={styles.completeButton}>{task.completed ? "Desmarcar" : "Concluir"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FB",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "#1C1C1E",
    fontWeight: "600",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 10,
    fontSize: 16,
    color: "#1C1C1E",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  scrollContainer: {
    marginTop: 10,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textTask: {
    flex: 1,
    fontSize: 18,
    color: "#1C1C1E",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  completeButton: {
    color: "#34C759",
    marginRight: 16,
    fontSize: 16,
  },
  deleteButton: {
    color: "#FF3B30",
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
