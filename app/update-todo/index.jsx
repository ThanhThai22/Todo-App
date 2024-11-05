import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { getUserTodo, updateTodo } from '../../model/todo';
import { parse } from 'expo-linking';
import { TouchableOpacity } from 'react-native';

export default function UpdateTodoScreen() {

    const navigation = useNavigation();
    const todo = useLocalSearchParams();
    // console.log(todo.userID);
    const parseTodo = JSON.parse(todo.todoData);
    // console.log(parseTodo);

    const todoId = parseTodo.todoId;
    const userId = todo.userID;


    const [title, setTitle] = useState(parseTodo.title);
    const [description, setDescription] = useState(parseTodo.description);
    const [status, setStatus] = useState(parseTodo.status);
    
    const fetchTodo = async() => {
        const userData = await getUserTodo(todo.userID);
        if(userData&&userData.todos) {
            const todo = userData.todos.find(todo => todo.todoId === todoId);
            if(todo) {
                setTitle(todo.title);
                setDescription(todo.description);
                setStatus(todo.status);
            }
        }
    };


    useEffect(() => {
        navigation.setOptions({title: 'Thêm một công việc mới'})

        fetchTodo();
      }, [todo.userID, todoId]);

      const handleUpdate = async() => {
        const updatedTodo = {
            title,
            description,
            status,
            createdAt: new Date().toISOString(),
            todoId
          };
          try {
            await updateTodo(userId, updatedTodo);
            console.log("Cập nhật thành công");
          } catch (error) {
            console.log("Cập nhật thất bại");
          }

        navigation.goBack('/home');
        Alert.alert("Thông báo", "Công việc đã được cập nhật thành công vui lòng tải lại ứng dụng!");
      }

  return (
    // <View>
    //   <TextInput
    //     placeholder="Title"
    //     value={title}
    //     onChangeText={setTitle}
    //   />
    //   <TextInput
    //     placeholder="Description"
    //     value={description}
    //     onChangeText={setDescription}
    //   />
    //   <Button title="Update Todo" onPress={handleUpdate} />
    // </View>

    <View style={styles.container}>
        <Text style={styles.title}>Hãy chỉnh sửa lại một chút về công việc của bạn nào!</Text>
      <TextInput
        placeholder="Tiêu đề công việc"
        value={title}
        onChangeText={setTitle}
        style={styles.textInputTitle}
      />
      <TextInput
        placeholder="Mô tả công việc ở đây"
        value={description}
        onChangeText={setDescription}
        style={styles.textInputDes}
      />
      <View style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '8%',
        marginBottom: 16,
        padding: 2,
        }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>Trạng thái: </Text>
        <TextInput
          placeholder="Cập nhật trạng thái"
          value={status}
          onChangeText={setStatus}
          style={styles.textStatus}
        />
      </View>
      {/* <Button title="Add Todo" onPress={handleAddTodo} style={styles.btnSubmitAdd}/> */}
      <TouchableOpacity onPress={handleUpdate} style={styles.btnSubmitAdd}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Sửa công việc</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textStatus:{
    height: 45,
    borderLeftWidth: 2,
    borderRightWidth: 0.5,
    borderBottomWidth: 3,
    borderRadius: 15,
    padding: 12,
    textAlign: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 200
  },
  title:{
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 18
  },
  btnSubmitAdd: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderLeftWidth: 2,
    borderRightWidth: 0.5,
    borderBottomWidth: 3,
    borderTopWidth: 0.5,
  },
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#D4F6FF',
  },
  textInputTitle: {
    borderLeftWidth: 2,
    borderRightWidth: 0.5,
    borderBottomWidth: 3,
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  textInputDes: {
    borderLeftWidth: 2,
    borderRightWidth: 0.5,
    borderBottomWidth: 3,
    borderRadius: 15,
    padding: 12,
    height: '60%',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#fff'
  }
})