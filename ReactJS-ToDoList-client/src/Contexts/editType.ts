import React from "react";

export type EditType = {
    showEdit: boolean;
    setshowEdit: Function;
    editId: string;
    seteditId: Function;
    editTask: { name: string, category: string, isDone: boolean, color: string, id: string };
    seteditTask: Function;
    editProjectId: string;
    setEditProjectId: Function;
}