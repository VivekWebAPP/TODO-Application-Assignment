import React, {useState, createContext} from "react";
import { addProjectType } from "./addProjectType";

export interface ChildrenProps {
    children: React.ReactNode;
}

export const AddProjectContext = createContext<addProjectType|null>(null);

export const AddProjectContextProvider: React.FC<ChildrenProps> = ({children}) =>{
    const [showProject, setshowProject] = useState(false);
    const [id, setid] = useState('');

    return(
        <AddProjectContext.Provider value={{showProject, setshowProject, id, setid}}>
            {children}
        </AddProjectContext.Provider>
    );

}