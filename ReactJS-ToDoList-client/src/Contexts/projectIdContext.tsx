import React, { useState, createContext } from "react";
import { ProjectIdType } from "./projectIdType";

export interface ChildrenProps {
    children: React.ReactNode;
}

export const ProjectIdContext = createContext<ProjectIdType | null>(null);

export const ProjectIdContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('')

    return (
        <ProjectIdContext.Provider value={{ projectId, setProjectId, projectName, setProjectName }}>
            {children}
        </ProjectIdContext.Provider>
    );

}