import React, { useState, createContext } from "react";
import { EditType } from "./editType";

export interface ChildrenProps {
    children: React.ReactNode;
}

export const EditContext = createContext<EditType | null>(null);

export const EditContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [showEdit, setshowEdit] = useState(false);
    const [editId, seteditId] = useState('');
    const [editTask, seteditTask] = useState({ name: '', category: '', isDone: false, color: '', id: '' });
    const [editProjectId, setEditProjectId] = useState('');

    return (
        <EditContext.Provider value={{ showEdit, setshowEdit, editId, seteditId, editTask, seteditTask, editProjectId, setEditProjectId }}>
            {children}
        </EditContext.Provider>
    );

}