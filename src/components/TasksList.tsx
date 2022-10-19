import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { EditProps } from '../pages/Home';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}


interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editingTask: ({idTask, newTaskTitle}: EditProps) => void
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editingTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              task={item} 
              toggleTaskDone={toggleTaskDone} 
              removeTask={removeTask}
              editingTask={editingTask}
          />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

