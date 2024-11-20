import React, { useContext, useState } from "react";
import * as S from "./styles"
import { ProjectListContext } from "../../Contexts/projectListContext";
import { ProjectListType, UpdateProjectProps } from "../../Contexts/ProjectListType";
import { AddProjectContext } from "../../Contexts/addProjectContext";
import { addProjectType } from "../../Contexts/addProjectType";


const AddProjectModal: React.FC = () => {
    const { addProject } = useContext(ProjectListContext) as ProjectListType;
    const { setshowProject, } = useContext(AddProjectContext) as addProjectType;
    const [taskName, setTaskName] = useState("");

    function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(event.target.value);
    };

    function handleCancel() {
        setshowProject(false);
    };

    function handleAdd() {
        const newTask: UpdateProjectProps = {
            _id: '',
            name: taskName,
        }
        setshowProject(false);
        addProject(newTask);
    }

    return (
        <S.Background>
            <S.Container>
                <S.Text>Insert name</S.Text>
                <S.TitleInput placeholder="Task name" onChange={handleTyping} value={taskName} />
                <S.Buttons>
                    <S.CancelButton onClick={handleCancel} >Cancel</S.CancelButton>
                    <S.DeletButton onClick={handleAdd}>Add</S.DeletButton>
                </S.Buttons>
            </S.Container>
        </S.Background>
    )
};

export default AddProjectModal;