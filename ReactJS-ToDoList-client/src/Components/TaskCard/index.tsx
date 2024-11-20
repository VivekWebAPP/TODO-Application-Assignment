import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import { EditContext } from "../../Contexts/editContext";
import { EditType } from "../../Contexts/editType";

interface TaskCardProps {
    id: string;
    name: string;
    list: string;
    color: string;
    done: boolean;
};

const TaskCard: React.FC<TaskCardProps> = ({ id, name, list, color, done }) => {

    const { setShowDelete, setId } = useContext(DeleteContext) as DeleteType;
    const { checkTask } = useContext(TaskListContext) as TaskListType;
    const { setshowEdit, seteditId, seteditTask, editProjectId, setEditProjectId } = useContext(EditContext) as EditType;

    function handleCheck() {
        checkTask(id);
    }

    function handleDelete() {
        setShowDelete(true);
        setId(id);
    }

    function handleEdit() {
        seteditTask({ id: id, name: name, category: list, isDone: done, color: color });
        setshowEdit(true);
        seteditId(id);
        setEditProjectId(id);
    }

    return (
        <S.Container>
            <S.CheckField>
                <S.CheckboxRing onClick={handleCheck}><S.CheckFill done={done} /></S.CheckboxRing>
            </S.CheckField>
            <S.Description>
                <S.Name done={done}>{name}</S.Name>
                <S.ListBelong>
                    <S.ColorTag color={color} />
                    <S.ListName>{list}</S.ListName>
                </S.ListBelong>
            </S.Description>
            <S.Icon src={Edit} onClick={handleEdit} />
            <S.Icon src={Erase} onClick={handleDelete} />
        </S.Container>
    );
};

export default TaskCard;