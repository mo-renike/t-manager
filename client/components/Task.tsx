import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Task as TaskType, updateTask, deleteTask } from "../store/tasksSlice";

interface Props {
  task: TaskType;
}

const Task: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);
  const [updatedDate, setUpdatedDate] = useState(task.date);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(
      updateTask({
        id: task.id,
        title: updatedTitle,
        description: updatedDescription,
        priority: updatedPriority,
        date: new Date(),
      })
    );
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    alert("are you sure you want to delete ?");
    dispatch(deleteTask(task.id));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate =  new Date(inputValue) ;
    setUpdatedDate(parsedDate);
  };
  return (
    <div className="task">
      {isEditing ? (
        <div className="form">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <div className="flex">
            <input
              type="date"
              placeholder="Due Date"
              value={updatedDate ? updatedDate.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
            />
            <select
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div className="tas">
          <h3>{task.title}</h3>
          <p className="des">{task.description}</p>
          <p className="pro">{task.priority}</p>
          <p> <b>Due:</b> {task.date.toLocaleDateString()}</p>{" "}
        </div>
      )}

      <div className="task-actions ">
        <button onClick={handleEditClick} className="edit-button">
          Edit
        </button>
        <button onClick={handleDeleteClick} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
