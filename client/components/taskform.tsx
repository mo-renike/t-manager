import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Task, addTask, updateTask } from "../store/tasksSlice";
//import { useRouter } from "next/router";


const TaskForm: React.FC = () => {
//  const router = useRouter(); 
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = inputValue ? new Date(inputValue) : null;
    setDate(parsedDate);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    if (editMode && editTaskId) {
      dispatch(
        updateTask({
          id: editTaskId,
          title,
          description,
          priority,
          date: new Date(),
        })
      );
      setEditMode(false);
      setEditTaskId(null);
    } else {
      dispatch(
        addTask({
          title,
          description,
          id: 0,
          priority,
          date: new Date(),
        })
      );
    }

    // Clear the form and reset the error message
    setTitle("");
    setPriority("");
    setDescription("");
    setError("");
  //  router.push("/");

  };

  const editTask = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setEditMode(true);
    setEditTaskId(task.id);
  };

  return (
    <div className="form">
      <h2>{editMode ? "Edit Task" : "Add a new Task"}</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <p style={{ color: "red", fontSize: "13px", textAlign: "left" }}>
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex">
          <input
            type="date"
            placeholder="Due Date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={handleDateChange}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default TaskForm;