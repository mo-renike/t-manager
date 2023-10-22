"use client";
import { Provider } from "react-redux";
import store from "../../store";
import Link from "next/link";
import Tasks from "../../components/Tasks";

export default function TaskListPage() {
  return (
    <Provider store={store}>
      <header>
        <Link href="/create-task">Create Task</Link>
      </header>
      <Tasks />
    </Provider>
  );
}
