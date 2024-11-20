import React, { useContext } from "react";
import * as S from "./styles";
import Add from "../../Img/add.svg";
import { addProjectType } from "../../Contexts/addProjectType";
import { AddProjectContext } from "../../Contexts/addProjectContext";

const AddProject: React.FC = () => {
    const { setshowProject } = useContext(AddProjectContext) as addProjectType;

    function handleClick() {
        setshowProject(true);
    };

    return (
        <S.Container onClick={handleClick}>
            <S.Icon src={Add} />
            <S.Text>Add a Project</S.Text>
        </S.Container>
    );
};

export default AddProject;