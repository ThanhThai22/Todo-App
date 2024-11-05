import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { addTodo, addTodoToFireStore } from '../../model/todo';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { RouterStore } from 'expo-router/build/global-state/router-store';
import { TouchableOpacity } from 'react-native';

export default function AddTodo() {
    const navigation = useNavigation();
    const userId = useLocalSearchParams();
    // console.log(userId);
    // const [statusTodo, setStatusTodo] = useState('Not complete');



    useEffect(() => {
      navigation.setOptions({title: 'Thêm một công việc mới'})
    }, []);

    // const addTodo = async() => {
    //     if(!title.length === '' || !description.length === '') {
    //         Alert.alert("Thong bao", "Vui long nhap day du thong tin");
    //         return;
    //     }

    //     const newTodo = {
    //         title,
    //         description,
    //         status: 'not complete',
    //         createdAt: new Date().toISOString(),
    //         todoId: Date.now().toString(),
    //     }

    //     try {
    //         // await addTodoToFireStore(userId, {
    //         //     title: title,
    //         //     description: description,
    //         //     status: 'not complete',
    //         //     createdAt: '2024'
    //         // });
    //         await addTodoToFireStore(userId, newTodo);
    //         setTitle('');
    //         setDescription('');
    //     } catch (error) {
    //         console.log("Loi them cong viec",error);
    //     }
    // }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  const handleAddTodo = async () => {
    if(!title.length&&!description.length){
      Alert.alert("Thông báo", "Vui lòng nhập tiêu và mô tả để hoàn thành thêm công việc mới vui lòng tải lại trang để thấy thông tin")
    }else{
      try {
        await addTodo(userId.userId, {
          title: title,
          description: description,
          status: 'not complete',
          createdAt: new Date().toISOString(),
          todoId: Date.now().toString(),
        });
  
        navigation.goBack('/home');
        Alert.alert("Thông báo đã thêm thành công một công việc mới!")
      } catch (error) {
        console.log(error);
      }
    }
  }
    
  return (
    // <View>
    //   <Text>AddTodo</Text>

    //   <TextInput
    //     style={styles.textInput}
    //     value={title}
    //     onChangeText={setTitle}
    //     placeholder='Nhap tieu de cong viec'
    //   />

    //   {/* mo ta  */}
    //   <TextInput
    //     style={styles.textInput}
    //     value={description}
    //     onChangeText={setDescription}
    //     placeholder='Nhap mo ta cong viec'
    //   />

    //     <Button title='Them cong viec' onPress={handleAddTodo}/>
    // </View>

    <View style={styles.container}>
        <Text style={styles.title}>Hãy tạo một công việc mới cho tương lai nào</Text>
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
      {/* <Button title="Add Todo" onPress={handleAddTodo} style={styles.btnSubmitAdd}/> */}
      <TouchableOpacity onPress={handleAddTodo} style={styles.btnSubmitAdd}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Thêm công việc mới</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
    height: '70%',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#fff'
  }
})