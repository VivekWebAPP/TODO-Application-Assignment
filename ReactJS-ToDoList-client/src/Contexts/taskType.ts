export interface TaskProps {
    id: number;
    title: string;
    done: boolean;
    categorie: string;
    color: string;
};

export interface NewTaskProps {
    _id: string,
    project: string,
    name: string,
    category: string,
    isDone: boolean,
    color: string,
}

export interface UpdateTaskProps {
    _id: string,
    name: string,
    project: string,
    category: string,
    isDone: boolean,
    color: string,
}

export type TaskListType = {
    taskList: NewTaskProps[];
    doneTasks: NewTaskProps[];
    notDoneTasks: NewTaskProps[];
    addTask: (task: NewTaskProps) => void;
    updateTask: (name: string, category: string, isDone: boolean, color: string, token: string, id: string) => void;
    checkTask: (id: string) => void;
    deleteTask: (id: string) => void;
}