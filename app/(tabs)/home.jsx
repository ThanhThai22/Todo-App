import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { deleteTodo, getTodoFromUser, getUserTodo, updateTodo } from '../../model/todo';
import { render } from 'react-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
    const data = useLocalSearchParams();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(todos[0].title);
    const router = useRouter();

    const fetchDataTodos = async() => {
        const todoData = await getTodoFromUser(data.userId);
        if(todoData && todoData.todos){
            setTodos(todoData.todos);
        }
      }
      useEffect(() => {
        setLoading(true);
        fetchDataTodos();
        setLoading(false);
    }, [data.userId]);

    const handleAddTodo = () => {
        router.push({
            pathname: 'add-todo',
            params: {userId: data.userId}
        });
    }

    const handleDelete = async(todoId) => {
      try {
        await deleteTodo(data.userId, todoId);
        Alert.alert("Thông báo", "Công việc đã được xóa");
      } catch (error) {
        console.log(error);
      }
    }

    const handleUpdate = async(dataItem) => {
      // try {
      //   await updateTodo(data.userId, )
      // } catch (error) {
        
      // }
      const userID = data.userId;
      const todoData = JSON.stringify(dataItem);
      router.push({
        pathname: 'update-todo',
        params: {userID, todoData}
      });
    }


    
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Xin chào </Text>
        <Text style={styles.nameUser}>{data.userName}</Text>
      </View>

      <FlatList
        data={todos}
        renderItem={({item}) => (
            <TouchableOpacity 
            style={styles.itemContainer}
            onPress={()=>handleUpdate(item)}
            >
              <View style={styles.item}>
                  <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.title}</Text>
                  <Text style={{ fontSize: 16, marginVertical: 12 }}>{item.description}</Text>
                  {item.status !== 'complete' ? (
                    <Text style={{ fontSize: 12, color: '#FFE31A', fontWeight: 'bold' }}>{item.status}</Text>
                  ) : (
                    <Text style={{ fontSize: 12, color: '#00FF9C', fontWeight: 'bold' }}>{item.status}</Text>
                  )}
                  <Text style={{ fontSize: 12 }}>{item.createdAt}</Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                {/* <Button title='Delete post' onPress={()=>handleDelete(item.todoId)}/> */}
                <TouchableOpacity onPress={()=>handleDelete(item.todoId)}>
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
                {/* <Button title='Update post' onPress={()=>handleUpdate(item)}/> */}
              </View>

            </TouchableOpacity>
        )}
        keyExtractor={item => item.todoId}
        ListEmptyComponent={<Text>Không có công việc nào!</Text>}
        onRefresh={fetchDataTodos}
        refreshing={loading}
      />

      {/* <Button title='Thêm một công việc mới' onPress={handleAddTodo}/> */}
      <TouchableOpacity style={styles.btnAddCV} onPress={handleAddTodo}>
        <Text style={{ 
          fontSize: 16,
          fontWeight: '500',
         }}>Thêm công việc mới nào!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnAddCV: {
    padding: 12,
    borderLeftWidth: 2,
    borderRightWidth: 0.5,
    borderBottomWidth: 3.5,
    borderTopWidth: 0.4,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 22,
    backgroundColor: '#fff',
  },
  container:{
    padding: 20,
    marginTop: 30,
    backgroundColor: '#D4F6FF',
    height: '100%'
  },
  title:{
    fontSize: 24,
    marginLeft: 10
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  nameUser:{
    fontSize: 28,
    fontWeight: 'bold',
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRightWidth: 0.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 3.5,
    borderTopWidth: 0.1,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }, 
  item: {
    gap: 12
  }
})