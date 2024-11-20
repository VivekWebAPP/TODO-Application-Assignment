import React from "react";
import { DeleteContextProvider } from "./Contexts/deleteContext";
import { TaskContextProvider } from "./Contexts/taskListContext";
import { ChildrenProps } from "./Contexts/deleteContext";
import { CategoriesContextProvider } from "./Contexts/categoriesContext";
import { AddContextProvider } from "./Contexts/addContext";
import { AuthProvider } from "./Contexts/authContext";
import { EditContextProvider } from "./Contexts/editContext";
import { DeleteProjectContextProvider } from "./Contexts/deleteProjectContext";
import { EditProjectContextProvider } from "./Contexts/updateProjectContext";
import { ProjectListContextProvider } from "./Contexts/projectListContext";
import { AddProjectContextProvider } from "./Contexts/addProjectContext";
import { ProjectIdContextProvider } from "./Contexts/projectIdContext";

const ContextProviders: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <ProjectListContextProvider>
            <AddProjectContextProvider>
                <EditProjectContextProvider>
                    <DeleteProjectContextProvider>
                        <ProjectIdContextProvider>
                            <TaskContextProvider>
                                <EditContextProvider>
                                    <DeleteContextProvider>
                                        <AddContextProvider>
                                            <CategoriesContextProvider>
                                                <AuthProvider>
                                                    {children}
                                                </AuthProvider>
                                            </CategoriesContextProvider>
                                        </AddContextProvider>
                                    </DeleteContextProvider>
                                </EditContextProvider>
                            </TaskContextProvider>
                        </ProjectIdContextProvider>
                    </DeleteProjectContextProvider>
                </EditProjectContextProvider>
            </AddProjectContextProvider>
        </ProjectListContextProvider>
    )
};

export default ContextProviders;