import React, { useState, createContext, useEffect, useContext } from "react";
import { TaskListType, NewTaskProps, UpdateTaskProps } from "./taskType";
import { createNewTask, deleteUserTask, getAllTheTask, updateATask } from "../API/taskManagement";
import { ProjectIdContext } from "./projectIdContext";
import { ProjectIdType } from "./projectIdType";

interface ChildrenProps {
    children: React.ReactNode;
}

export const TaskListContext = createContext<TaskListType | null>(null);

export const TaskContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [userTaskList, setuserTaskList] = useState<NewTaskProps[]>([]);
    const [doneTasks, setDoneTasks] = useState<NewTaskProps[]>([]);
    const [notDoneTasks, setNotDoneTasks] = useState<NewTaskProps[]>([]);
    const token = localStorage.getItem("AuthToken");
    const { projectId } = useContext(ProjectIdContext) as ProjectIdType;

    useEffect(() => {
        const fetchTasks = async () => {
            if (!projectId || !token) {
                console.warn("Missing projectId or token");
                return;
            }

            try {
                // Fetch tasks from the API
                const response = await getAllTheTask(projectId, token);
                if (response?.tasks) {
                    setuserTaskList(response.tasks);
                } else {
                    console.error("Invalid API response:", response);
                    setuserTaskList([]);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setuserTaskList([]);
            }
        };

        setuserTaskList([]);
        fetchTasks();
    }, [projectId, token]);


    useEffect(() => {
        setDoneTasks(userTaskList.length !== 0 ? userTaskList.filter(task => task.isDone) : []);
        setNotDoneTasks(userTaskList.length !== 0 ? userTaskList.filter(task => !task.isDone) : []);
    }, [userTaskList]);

    const addTask = async (task: NewTaskProps) => {
        const response = await createNewTask(projectId, task.name, task.category, task.color, token);
        const newTask = response.task;
        const updatedTaskList = [...userTaskList, newTask];
        setuserTaskList(updatedTaskList);
    };

    const updateTask = async (name: string, category: string, isDone: boolean, color: string, token: string, id: string) => {
        const updatedTaskList = await Promise.all(
            userTaskList.map(async (task: UpdateTaskProps) => {
                if (task._id === id && token) {
                    const response = await updateATask(projectId, id, name, category, isDone, color, token);
                    return response.task;
                }
                return task;
            })
        );
        setuserTaskList(updatedTaskList);
    }

    const checkTask = async (id: string) => {
        const updatedTaskList = await Promise.all(
            userTaskList.map(async (task: NewTaskProps) => {
                if (task._id === id && token) {
                    const response = await updateATask(projectId, id, task.name, task.category, !task.isDone, task.color, token);
                    return { ...task, isDone: !task.isDone };
                }
                return task;
            })
        );
        setuserTaskList(updatedTaskList);
    };

    const deleteTask = async (id: string) => {
        await deleteUserTask(projectId, id, token);
        const updatedTaskList = userTaskList.filter(task => task._id !== id);
        setuserTaskList(updatedTaskList);
    };

    return (
        <TaskListContext.Provider value={{ taskList: userTaskList || [], doneTasks: doneTasks || [], notDoneTasks: notDoneTasks || [], addTask, updateTask, checkTask, deleteTask }}>
            {children}
        </TaskListContext.Provider>
    );
};
