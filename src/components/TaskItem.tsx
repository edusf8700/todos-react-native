import React, { useEffect, useRef, useState }  from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import { EditProps } from '../pages/Home';

type TaskItemProps = {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editingTask: ({idTask, newTaskTitle}: EditProps) => void
}

export function TaskItem({task, toggleTaskDone, removeTask, editingTask}:TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const inputRef = useRef<TextInput>(null);

  function handleIsEditing() {
    setIsEditing(true);
  }

  function handleEditingCancel() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editingTask({idTask: task.id, newTaskTitle});
    setIsEditing(false);
  }

  useEffect(() => {
    if(inputRef.current) {
      if(isEditing) {
        inputRef.current.focus();
      }else {
        inputRef.current.blur();
      }
    }
  },[isEditing])

	return(
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={()=>toggleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker }
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          
          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText }
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            ref={inputRef}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.iconContainer}>
        {!isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={handleIsEditing}
          >
            <Icon 
              name="edit-3"
              size={20}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={handleEditingCancel}
          >
            <Icon 
              name="x"
              size={20}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        )}
      
        <View style={styles.divider}/>

        <TouchableOpacity
          style={[{ paddingRight: 5 }, {opacity: isEditing ? .3 : 1}]}
          onPress={()=>removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: '#B2B2B2',
    marginHorizontal: 6
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})