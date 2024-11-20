import React from "react";

export type EditProjectType = {
    showEditProject: boolean;
    setshowEditProject: Function;
    editId: string;
    seteditId: Function;
    editTask: { name: string, id: string };
    seteditTask: Function;
}