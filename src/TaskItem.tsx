import React, { useState } from "react";
import { ListItem, Grid, TextField } from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { db } from "./firebase";

interface Props {
  id: string;
  title: string;
}

const TaskItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button onClick={editTask}>
        <EditOutlined />
      </button>
      <button onClick={deleteTask}>
        <DeleteOutline />
      </button>
    </ListItem>
  );
};

export default TaskItem;
