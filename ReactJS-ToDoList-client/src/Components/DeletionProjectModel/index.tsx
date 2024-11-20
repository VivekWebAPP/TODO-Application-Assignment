import React from "react";
import * as S from "./styles";
import { useContext } from "react";
import { DeleteProjectType } from "../../Contexts/deleteProjectType";
import { DeleteProjectContext } from "../../Contexts/deleteProjectContext";
import { ProjectListContext } from "../../Contexts/projectListContext";
import { ProjectListType } from "../../Contexts/ProjectListType";

const DeleteProjectModal: React.FC = () => {
    const { setShowProjectDelete, id, setId } = useContext(DeleteProjectContext) as DeleteProjectType;
    const { deletionProject } = useContext(ProjectListContext) as ProjectListType;

    function handleCancel() {
        setShowProjectDelete(false);
    };

    function handleConfirm() {
        deletionProject(id);
        setId(0);
        setShowProjectDelete(false);
    }


    return (
        <S.Background>
            <S.Container>
                <S.Text>Are you sure you want to delete this task?</S.Text>
                <S.Buttons>
                    <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
                    <S.DeletButton onClick={handleConfirm}>Delete</S.DeletButton>
                </S.Buttons>
            </S.Container>
        </S.Background>
    )
};

export default DeleteProjectModal;