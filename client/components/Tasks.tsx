"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Task from "./Task";

const Tasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>Manage your Tasks</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
