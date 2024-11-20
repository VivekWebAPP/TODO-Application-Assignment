export interface ProjectProps {
    id: number;
    name: string;
    creationDate:string;
    creationTime:string;
};

export interface NewProjectProps {
    _id: string,
    name: string;
    creationDate:string;
    creationTime:string;
}

export interface UpdateProjectProps {
    _id:string,
    name:string,
}

export type ProjectListType = {
    projectList: NewProjectProps[];
    addProject: (task: UpdateProjectProps) => void;
    updateProject: (name:string,token:string,id:string) => void;
    deletionProject: (id: string) => void;
}