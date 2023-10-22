"use client";
import { Provider } from "react-redux";
import store from "../../../store";
import TaskForm from "../../../components/taskform";
import Link from "next/link";

export default function TaskListPage() {
  return (
    <Provider store={store}>
      <header>
        <Link href="/">Tasks</Link>
      </header>
      <TaskForm />
    </Provider>
  );
}
