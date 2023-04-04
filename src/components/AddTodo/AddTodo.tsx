import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "../Todo/types";
import styles from "./AddTodo.module.css";

const AddTodo = ({ onAdd }: { onAdd: (newTodo: Todo) => void }) => {
  const [text, setText] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text, status: "active" });
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
};

export default AddTodo;
