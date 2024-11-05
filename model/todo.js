import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebaseConfig"

//Hàm kiểm tra người dùng có tồn tại không
export const checkUser = async(userName) => {
    try {
        const userQuery = query(collection(db, 'users'), where('userName', '==', userName));
        const userSnapShot = await getDocs(userQuery);

        if(userSnapShot.empty){
            const userDocRef = await addDoc(collection(db, 'users'), {
                userName,
            });
            console.log("Người dùng đã được thêm hoặc cập nhật thành công", userDocRef.id);
            return {userId: userDocRef.id, userName}
        }else{
            const existingUser = userSnapShot.docs[0];
            console.log("Người dùng đã tồn tại:", existingUser.id);
            return {userId: existingUser.id, userName: existingUser.data().userName};
        }


    } catch (error) {
        console.error("Lỗi khi thêm hoặc cập nhật người dùng:", error);
    }
}

//Lấy danh sách công việc người dùng
export const getUserTodo = async(userId) => {
    try {
        // const todoQuery = query(collection(db, 'users', userId, 'todos'), orderBy('createdAt', 'desc'));
        // const todoSnapShot = await getDocs(todoQuery);

        const todosRef = collection(db, 'users', userId, 'todos');
        const todoSnapShot = await getDocs(todosRef);

        const todos = todoSnapShot.docs.map(doc=> ({
            id: doc.id,
            ...doc.data(),
        }))

        return todos;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
    }
}

// const getUserDocRef = (userId) => doc(db, 'users', userId);
// export const getUser = async(userId) => {
//     const userDoc = getUserDocRef(userId);
//     const userSnap = await getDoc(userDoc);

//     if(userSnap.exists()){
//         return userSnap.data();
//     }else{
//         console.log('No such document!');
//         return null
//     }
// };

//Hàm thêm công việc
export const addTodoToFireStore = async(userId, todo) => {
    const userDoc = getUserDocRef(userId);

    try {
        // await addDoc(collection(db, 'users', userId), {
        //     userId: userId,
        //     todos: [todo],
        //     // createdAt: serverTimestamp(), // Kiểm tra xem `serverTimestamp` có được import từ firebase không
        // });
        await updateDoc(userDoc, {
            todos: arrayUnion(todo)
        });
        console.log("Công việc đã được thêm");
    } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
    }
};

const userCollection = collection(db, 'users');
//Ham them cong viec
export const addTodo = async (userId, todo) => {
  // const userDoc = getUserDocRef(userId);
  // const userSnap = await getDoc(userDoc);
  const userRef = doc(userCollection, userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    if (Array.isArray(userData.todos)) {
      // Nếu trường `todos` đã tồn tại và là mảng, sử dụng `updateDoc` để thêm công việc
      await updateDoc(userRef, {
        todos: arrayUnion(todo)
      });
    } else {
      // Nếu trường `todos` không tồn tại hoặc không phải là mảng, sử dụng `setDoc` để tạo trường và thêm công việc
      await setDoc(userRef, {
        todos: [todo]
      }, { merge: true });
    }
  } else {
    // Nếu tài liệu người dùng chưa tồn tại, tạo tài liệu mới với trường `todos`
    await setDoc(userRef, {
      todos: [todo]
    });
  }
}

//Hàm xóa công việc
export const deleteTodo = async(userId, todoId) => {
  const userRef = doc(userCollection, userId);
  const userSnap = await getDoc(userRef);
    try {
        // const todoRef = doc(db, 'users', userId, 'todos', todoId);
        // await deleteDoc(todoRef);
        if(userSnap.exists()){
          const userData = userSnap.data();
          const newTodo = userData.todos.filter(todo => todo.todoId !== todoId);

          await updateDoc(userRef, {
            todos: newTodo
          });
        }
        console.log("Công việc đã được xóa");
    } catch (error) {
        console.log("Công việc đã được xóa");
    }
}

//Hàm sửa công việc
export const updateTodo = async (userId, updatedTodo) => {
    try {
      const todoRef = doc(userCollection, userId);
      const todoSnap = await getDoc(todoRef);

      // await updateDoc(todoRef, updatedTodo);
      if(todoSnap.exists()){
        const userData = todoSnap.data();
        const newTodo = userData.todos.map(
          //kiem tra dk neu id cua todo dung voi id da truyen vao thi cho phep cap nhat khong thi tra lai todo luc truoc
          todo => todo.todoId === updatedTodo.todoId ? updatedTodo : todo
        );

        await updateDoc(todoRef, {
          todos: newTodo
        });
      }
      console.log("Công việc đã được cập nhật");
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
    }
};



export const getTodoFromUser = async(userId) => {
  const todoRef = doc(userCollection, userId);
  const todoSnap = await getDoc(todoRef);

  if(todoSnap.exists()){
    return todoSnap.data();
  }else{
    console.log('No such document!');
    return null;
  }
}