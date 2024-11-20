import React, {useState, createContext} from "react";
import { DeleteProjectType } from "./deleteProjectType";

export interface ChildrenProps {
    children: React.ReactNode;

  }

export const DeleteProjectContext = createContext<DeleteProjectType|null>(null);

export const DeleteProjectContextProvider: React.FC<ChildrenProps> = ({children}) =>{
    const [showProjectDelete, setShowProjectDelete] = useState(false);
    const [id, setId] = useState('0');

    return(
        <DeleteProjectContext.Provider value={{showProjectDelete, setShowProjectDelete, id, setId}}>
            {children}
        </DeleteProjectContext.Provider>
    );

}