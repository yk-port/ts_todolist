import React, { useState, useEffect } from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { AddToPhotosSharp } from "@material-ui/icons";
import { db } from "./firebase";

// interface TaskData {
//   id: string;
//   title: string;
// }

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  useEffect(() => {
    const onSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            title: doc.data().title,
          };
        })
      );
    });
    return () => onSub();
  }, []);

  return (
    <div>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="new task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <Button disabled={!input} onClick={newTask}>
        <AddToPhotosSharp />
      </Button>
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </div>
  );
};

export default App;
