'use client';

import TodoItem from '@/components/todoItem';
import EditForm from './editForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    const saveTodoList = JSON.parse(localStorage.getItem('todos')) || [];
    setTodoList(saveTodoList);
  }, []);

  const onAddButton = () => {
    const addTodo = [
      ...todoList,
      { id: uuidv4(), name: valueInput, isCompleted: false, isEditing: false }
    ];
    setTodoList(addTodo);
    localStorage.setItem('todos', JSON.stringify(addTodo));
    setValueInput('');
  };

  const onCheckTodoItem = (id) => {
    const checkTodo = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(checkTodo);
    localStorage.setItem('todos', JSON.stringify(checkTodo));
  };

  const onDeleteTodo = (id) => {
    const deleteTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(deleteTodo);
    localStorage.setItem('todos', JSON.stringify(deleteTodo));
  };

  const onCheckEdit = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const updateEdit = (id, newTodo) => {
    const updateEditTodo = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, name: newTodo, isEditing: !todo.isEditing }
        : todo
    );
    setTodoList(updateEditTodo);
    localStorage.setItem('todos', JSON.stringify(updateEditTodo));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter your todo list !!!"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
            />
            <Button
              className="bg-blue-950"
              type="submit"
              onClick={onAddButton}
              disabled={!valueInput}
            >
              Add
            </Button>
          </div>
          <div className="mt-4">
            {todoList.map((item) =>
              item.isEditing ? (
                <EditForm todo={item} updateEdit={updateEdit} />
              ) : (
                <TodoItem
                  key={item.id}
                  todo={item}
                  onCheckTodoItem={onCheckTodoItem}
                  onDeleteTodo={onDeleteTodo}
                  onCheckEdit={onCheckEdit}
                />
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoList;
