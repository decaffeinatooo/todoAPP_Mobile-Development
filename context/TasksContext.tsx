import React, { createContext, useState, useContext } from "react";
import { Task } from "../components/types";

type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

type TasksProviderProps = { children: React.ReactNode };

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};