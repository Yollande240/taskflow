import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Charger les tâches
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");

      const data = await response.json();

      console.log(data);

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Ajouter une tâche
  const addTask = async () => {
    if (title.trim() === "") return;

    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      setTitle("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  // Terminer / réactiver une tâche
  const toggleTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>TaskFlow</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Ajouter
        </button>
      </div>

      <p>Nombre de tâches : {tasks.length}</p>

      <div>
        {tasks.map((task) => (
          <div className="task" key={task._id}>

            <span
              onClick={() => toggleTask(task._id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task._id)}>
              ❌
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
