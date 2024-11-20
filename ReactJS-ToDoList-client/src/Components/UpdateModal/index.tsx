import React, { useContext, useState, useEffect } from "react";
import * as S from "./styles";
import { EditType } from "../../Contexts/editType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import { EditContext } from "../../Contexts/editContext";

const UpdateModal: React.FC = () => {
    const { updateTask } = useContext(TaskListContext) as TaskListType;
    const { categList } = useContext(CategoriesContext) as CategorieContextType;
    const { setshowEdit, editTask, editProjectId } = useContext(EditContext) as EditType;
    const [taskName, setTaskName] = useState("");
    const [taskCat, setTaskCat] = useState<number | null>(null);
    const token = localStorage.getItem("AuthToken");

    useEffect(() => {
        setTaskName(editTask.name);
        const defaultCatIndex = categList.findIndex((cat) => cat.name === "None");
        setTaskCat(defaultCatIndex !== -1 ? categList[defaultCatIndex].id : null);
    }, [editTask.name, categList]);

    const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    };

    const handleCancel = () => {
        setshowEdit(false);
    };

    const handleEdit = () => {
        if (!token) {
            console.error("Token not found");
            return;
        }
        if (taskCat === null) {
            console.error("Task category not selected");
            return;
        }

        setshowEdit(false);
        updateTask(
            taskName || editTask.name,
            categList.find((cat) => cat.id === taskCat)?.name || editTask.category,
            editTask.isDone,
            categList.find((cat) => cat.id === taskCat)?.color || editTask.color,
            token,
            editTask.id,
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(event.target.value);
        setTaskCat(selectedValue);
    };

    return (
        <S.Background>
            <S.Container>
                <S.Text>Update name</S.Text>
                <S.TitleInput
                    placeholder="Project name"
                    onChange={handleTyping}
                    value={taskName}
                />
                <S.Select id="select" onChange={handleChange} value={taskCat || ""}>
                    {categList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </S.Select>
                <S.Buttons>
                    <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
                    <S.DeletButton onClick={handleEdit}>Update</S.DeletButton>
                </S.Buttons>
            </S.Container>
        </S.Background>
    );
};

export default UpdateModal;
