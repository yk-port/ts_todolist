import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import styles from "./App.module.css";
import { db } from "./firebase";

import { Button, FormControl, TextField, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AddToPhotosSharp } from "@material-ui/icons";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  const classes = useStyles();

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
    <div className={styles.app__root}>
      <FormControl>
        <TextField
          className={classes.field}
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

      <Button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosSharp />
      </Button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem id={task.id} title={task.title} key={task.id} />
        ))}
      </List>
    </div>
  );
};

export default App;
