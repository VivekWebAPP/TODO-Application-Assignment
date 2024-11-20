import React, { useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import { EditContext } from "../../Contexts/editContext";
import { EditType } from "../../Contexts/editType";
import { DeleteProjectContext } from "../../Contexts/deleteProjectContext";
import { DeleteProjectType } from "../../Contexts/deleteProjectType";
import { EditProjectContext } from "../../Contexts/updateProjectContext";
import { EditProjectType } from "../../Contexts/editProjectType";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { useNavigate } from "react-router-dom";
import { ProjectIdContext } from "../../Contexts/projectIdContext";
import { ProjectIdType } from "../../Contexts/projectIdType";

interface TaskCardProps {
    id: string;
    name: string;
    creationDate: string,
    creationTime: string,
};

const ProjectCard: React.FC<TaskCardProps> = ({ id, name, creationDate, creationTime }) => {

    const { setShowProjectDelete, setId } = useContext(DeleteProjectContext) as DeleteProjectType;
    const { setshowEditProject, seteditId, seteditTask } = useContext(EditProjectContext) as EditProjectType;
    const { setAddProjectId } = useContext(AddContext) as AddType;
    const { setEditProjectId } = useContext(EditContext) as EditType;
    const { setDeletionProjectId } = useContext(DeleteContext) as DeleteType;
    const { setProjectId,setProjectName } = useContext(ProjectIdContext) as ProjectIdType;
    const nagivate = useNavigate();
    const updatedDate = creationDate.slice(0,10);

    function handleDelete() {
        setShowProjectDelete(true);
        setId(id);
    }

    function handleEdit() {
        seteditTask({ name: name, id: id });
        setshowEditProject(true);
        seteditId(id);
    }

    const handleOnClick = () => {
        setAddProjectId(id);
        setProjectId(id);
        setDeletionProjectId(id);
        setEditProjectId(id);
        setProjectName(name);
        nagivate(`/project/${id}`);
    }

    return (
        <S.Container onClick={handleOnClick}>
            {/* <S.CheckField>
                <S.CheckboxRing onClick={handleCheck}><S.CheckFill done={done} /></S.CheckboxRing>
            </S.CheckField> */}
            <S.Description>
                <S.Name >{name}</S.Name>
                <S.ListBelong>
                    <S.ListName>Created At - {updatedDate.split("-").reverse().join("-")} , {creationTime}</S.ListName>
                </S.ListBelong>
            </S.Description>
            <S.Icon src={Edit} onClick={handleEdit} />
            <S.Icon src={Erase} onClick={handleDelete} />
        </S.Container>
    );
};

export default ProjectCard;