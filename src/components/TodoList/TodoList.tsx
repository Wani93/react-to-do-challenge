import { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import { v4 as uuidv4 } from "uuid";
import TodoComp from "../Todo/Todo";
import styles from "./TodoList.module.css";
import type { Todo } from "../Todo/types";
import type { Filter } from "../../App";

const getFilteredItems = (todos: Todo[], filter: Filter) => {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
};

const readTodos = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const TodoList = ({ filter }: { filter: Filter }) => {
  const [todos, setTodos] = useState<Todo[]>(readTodos);
  const filtered = getFilteredItems(todos, filter);

  const handleAdd = (newTodo: Todo) => {
    setTodos((todos) => [...todos, newTodo]);
  };

  const handleUpdate = (updated: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  const handleDelete = (deleted: Todo) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== deleted.id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <TodoComp
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
};

export default TodoList;
