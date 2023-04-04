import { FaTrashAlt } from "react-icons/fa";
import { ChangeEventHandler, MouseEventHandler } from "react";
import styles from "./Todo.module.css";
import type { Todo } from "./types";

const Todo = ({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
  onDelete: (deleted: Todo) => void;
}) => {
  const { text, status, id } = todo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const status = e.target.checked ? "completed" : "active";

    onUpdate({ ...todo, status });
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    onDelete(todo);
  };

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {text}
      </label>
      <button className={styles.icon} onClick={handleDelete}>
        <FaTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
