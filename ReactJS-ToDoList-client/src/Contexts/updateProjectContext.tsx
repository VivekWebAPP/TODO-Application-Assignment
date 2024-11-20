import React, { useState, createContext } from "react";
import { EditProjectType } from "./editProjectType";

export interface ChildrenProps {
    children: React.ReactNode;
}

export const EditProjectContext = createContext<EditProjectType | null>(null);

export const EditProjectContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [showEditProject, setshowEditProject] = useState(false);
    const [editId, seteditId] = useState('');
    const [editTask, seteditTask] = useState({ name: '', id: '' });

    return (
        <EditProjectContext.Provider value={{ showEditProject, setshowEditProject, editId, seteditId, editTask, seteditTask }}>
            {children}
        </EditProjectContext.Provider>
    );

}