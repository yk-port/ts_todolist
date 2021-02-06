import React, { useState, useEffect } from "react";
import { db } from "./firebase";

// interface TaskData {
//   id: string;
//   title: string;
// }

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

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
      {tasks.map((task) => (
        <p>{task.title}</p>
      ))}
    </div>
  );
};

export default App;
