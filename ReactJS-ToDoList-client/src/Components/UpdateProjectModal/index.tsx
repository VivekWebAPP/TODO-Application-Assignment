import React, { useContext, useState, useEffect } from "react";
import * as S from "./styles";
import { ProjectListType } from "../../Contexts/ProjectListType";
import { ProjectListContext } from "../../Contexts/projectListContext";
import { EditProjectType } from "../../Contexts/editProjectType";
import { EditProjectContext } from "../../Contexts/updateProjectContext";

const UpdateModalProject: React.FC = () => {
    const { updateProject } = useContext(ProjectListContext) as ProjectListType;
    const { setshowEditProject, editTask } = useContext(EditProjectContext) as EditProjectType;
    const [taskName, setTaskName] = useState("");
    const [taskCat, setTaskCat] = useState<number | null>(null);
    const token = localStorage.getItem("AuthToken");

    useEffect(() => {
        setTaskName(editTask.name);
    }, [editTask.name]);

    const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    };

    const handleCancel = () => {
        setshowEditProject(false);
    };

    const handleEdit = () => {
        if (!token) {
            console.error("Token not found");
            return;
        }

        setshowEditProject(false);
        updateProject(
            taskName || editTask.name,
            token,
            editTask.id,
        );
    };

    return (
        <S.Background>
            <S.Container>
                <S.Text>Update name</S.Text>
                <S.TitleInput
                    placeholder="Task name"
                    onChange={handleTyping}
                    value={taskName}
                />
                <S.Buttons>
                    <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
                    <S.DeletButton onClick={handleEdit}>Update</S.DeletButton>
                </S.Buttons>
            </S.Container>
        </S.Background>
    );
};

export default UpdateModalProject;
