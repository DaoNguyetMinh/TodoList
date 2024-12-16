import React from 'react';
import { Alert } from '@/components/ui/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const todoItem = ({ todo, onCheckTodoItem, onDeleteTodo, onCheckEdit }) => {
  return (
    <div className="flex flex-row flex-nowrap justify-between w-full items-center gap-2">
      <Alert
        className={`bg-blue-100 mt-2 ${todo.isCompleted && ' line-through'}`}
        onClick={() => onCheckTodoItem(todo.id)}
      >
        {todo.isEditing
          ? todo.name + `${(<span className="text-gray-800"> Edited </span>)}`
          : todo.name}
      </Alert>
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-sky-900 cursor-pointer"
          onClick={() => onCheckEdit(todo.id)}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-rose-500 cursor-pointer"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
    </div>
  );
};

export default todoItem;
