import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = tasks.map(task => ({...task}));
    newTasks.push({
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    })

    setTasks(newTasks);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => ({...task}));
    const taskDone = newTasks.find(task => task.id === id);
    if(taskDone) taskDone.done = !taskDone.done;
    setTasks(newTasks);
    
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.map(task => ({...task}));
    const taskRemove = newTasks.filter(task => task.id !== id);
    setTasks(taskRemove);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})