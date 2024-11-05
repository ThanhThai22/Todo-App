//Tạo các action để thêm, sửa, xóa và lấy danh sách công việc

export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo,
});

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    payload: id,
});

export const editTodo = (id, updatedTodo) => ({
    type: 'EDIT_TODO',
    payload: {id, updatedTodo},
});

export const setTodos = (todos) => ({
    type: 'SET_TODOS',
    payload: todos
});