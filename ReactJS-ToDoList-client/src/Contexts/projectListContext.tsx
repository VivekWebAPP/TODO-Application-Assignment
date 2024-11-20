import React, { useState, createContext, useEffect } from "react";
import { ProjectListType, NewProjectProps, UpdateProjectProps } from "./ProjectListType";
import { createNewProject, deleteProject, getAllProject, updateAProject } from "../API/projectManagement";

interface ChildrenProps {
    children: React.ReactNode;
}

export const ProjectListContext = createContext<ProjectListType | null>(null);

export const ProjectListContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [userProjectList, setuserProjectList] = useState<NewProjectProps[]>([]);
    const token = localStorage.getItem("AuthToken");

    useEffect(() => {
        const project = async () => {
            try {
                const response = await getAllProject(token);
                if (response?.project) {
                    setuserProjectList(response.project);
                } else {
                    console.error("Invalid API response:", response);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        if (userProjectList.length === 0) {
            project();
        }
    }, [userProjectList.length]);

    const addProject = async (task: UpdateProjectProps) => {
        const response = await createNewProject(task.name, token);
        const newTask = response.project;
        const updatedTaskList = [...userProjectList, newTask];
        setuserProjectList(updatedTaskList);
    };

    const updateProject = async (name: string, token: string, id: string) => {
        const updatedProjectList = await Promise.all(
            userProjectList.map(async (task: UpdateProjectProps) => {
                if (task._id === id && token) {
                    const response = await updateAProject(name, id, token);
                    return response.project;
                }
                return task;
            })
        );
        setuserProjectList(updatedProjectList);
    }

    // const checkTask = async (id: string) => {
    //     const updatedTaskList = await Promise.all(
    //         userProjectList.map(async (task: NewProjectProps) => {
    //             if (task._id === id && token) {
    //                 const response = await updateAProject(id, task.name, token);
    //                 return response;
    //             }
    //             return task;
    //         })
    //     );
    //     setuserProjectList(updatedTaskList);
    // };

    const deletionProject = async (id: string) => {
        await deleteProject(id, token);
        const updatedTaskList = userProjectList.filter(task => task._id !== id);
        setuserProjectList(updatedTaskList);
    };

    return (
        <ProjectListContext.Provider value={{ projectList: userProjectList || [], addProject, updateProject, deletionProject }}>
            {children}
        </ProjectListContext.Provider>
    );
};
