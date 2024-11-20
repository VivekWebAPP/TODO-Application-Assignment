import React, { createContext, useState } from "react";
import { CategorieProps, CategorieContextType } from "./categoriesType";

interface ChildrenProps {
    children: React.ReactNode;
};

export const CategoriesContext = createContext<CategorieContextType | null>(null);

export const CategoriesContextProvider: React.FC<ChildrenProps> = ({ children }) => {

    const [categList, setCategList] = useState<CategorieProps[]>([
        {
            id: 0,
            name: "Not Started",
            color: "#FF6B6B", 
        },
        {
            id: 1,
            name: "In Progress",
            color: "#FFD93D",
        },
        {
            id: 2,
            name: "Under Review",
            color: "#6BCB77", 
        },
        {
            id: 3,
            name: "Completed",
            color: "#4D96FF", 
        },
        {
            id: 4,
            name: "On Hold",
            color: "#9B59B6", 
        },
        {
            id: 5,
            name: "Cancelled",
            color: "#BDBDBD", 
        },
    ])

    return (
        <CategoriesContext.Provider value={{ categList }}>
            {children}
        </CategoriesContext.Provider>
    )
};

