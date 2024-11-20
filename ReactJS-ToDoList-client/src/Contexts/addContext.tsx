import React, { useState, createContext } from "react";
import { AddType } from "./addType";

export interface ChildrenProps {
    children: React.ReactNode;
}

export const AddContext = createContext<AddType | null>(null);

export const AddContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [id, setId] = useState('');
    const [addProjectId, setAddProjectId] = useState('');

    return (
        <AddContext.Provider value={{ showAdd, setShowAdd, id, setId, addProjectId, setAddProjectId }}>
            {children}
        </AddContext.Provider>
    );

}