import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { checkUser } from '../model/todo';
import { TouchableOpacity } from 'react-native';

export default function App() {
    const router = useRouter();
    const [userName, setUserName] = useState('');

    const handleInput = async() => {
        if(userName.trim() === ''){
            Alert.alert("Thông báo", "Vui lòng nhập họ tên trước khi bắt đầu");
            return;
        }

        const userData = await checkUser(userName);

        router.push({
            pathname: './home',
            params: {userId: userData.userId, userName: userData.userName}
        });
    }
  return (
    <View style={styles.container}>
      <Text style={styles.texttitle}>Chào mừng bạn đến với ứng dụng TODO</Text>
      <Text style={styles.textsub}>Hãy quản lý công việc mình một cách thông minh nào!</Text>
      <View>
        <TextInput
          placeholder='Vui lòng nhập tên để tiếp tục'
          style={styles.input}
          onChangeText={text => setUserName(text)}
        />
      </View>

      {/* <Button title="Tiếp tục" onPress={handleInput} /> */}
      <TouchableOpacity
      onPress={handleInput}
      style={styles.btnSubmit}
      >
        <Text>Tiếp tục</Text>
      </TouchableOpacity>
      {/* onPress={handleInput} */}
    </View>
  )
}

const styles = StyleSheet.create({
  texttitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  textsub: {
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16
  },
  btnSubmit: {
    padding: 8,
    width: 100,
    borderLeftWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 0.5,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
  input: {
      borderLeftWidth: 1.5,
      borderBottomWidth: 3,
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      padding: 8,
      borderRadius: 10,
      marginVertical: 16,
      width: 220
    }
  })