import React, { useContext, useState } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/taskFill.png";
import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import TaskCard from "../../Components/TaskCard";
import AddTask from "../../Components/AddTask";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import DeleteModal from "../../Components/DeleteModal";
import AddModal from "../../Components/AddModal";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { Link } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { EditContext } from "../../Contexts/editContext";
import { EditType } from "../../Contexts/editType";
import UpdateModal from "../../Components/UpdateModal";
import ExportAsGist from "../../Components/Export As Gist";
import { ProjectIdType } from "../../Contexts/projectIdType";
import { ProjectIdContext } from "../../Contexts/projectIdContext";


const Task: React.FC = () => {
    const { taskList = [], doneTasks = [], notDoneTasks = [] } = useContext(TaskListContext) as TaskListType;
    const { showDelete } = useContext(DeleteContext) as DeleteType;
    const { showEdit } = useContext(EditContext) as EditType;
    const { showAdd } = useContext(AddContext) as AddType;
    const [listToDisplay, setListToDisplay] = useState(0);
    const listOfLists = [taskList, doneTasks, notDoneTasks];
    const [allActive, setAllActive] = useState(true);
    const [doneActive, setDoneActive] = useState(false);
    const [notDoneActive, setNotDoneActive] = useState(false);
    const { setuserLogin } = useContext(AuthContext) as AuthType;
    const { projectName } = useContext(ProjectIdContext) as ProjectIdType;

    function handleAll() {
        setListToDisplay(0);
        setAllActive(true);
        setDoneActive(false);
        setNotDoneActive(false);
    }

    function handleDone() {
        setListToDisplay(1);
        setAllActive(false);
        setDoneActive(true);
        setNotDoneActive(false);
    }

    function handleNotDone() {
        setListToDisplay(2);
        setAllActive(false);
        setDoneActive(false);
        setNotDoneActive(true);
    }

    function handleLogout() {
        localStorage.removeItem("AuthToken");
        setuserLogin({ email: "", password: "y" });
        window.location.href = "/login";
    }

    return (
        <S.Page>
            <S.Sidebar>
                <S.Img src={Logo} />
                <S.Tabs>
                    <SidebarItem
                        icon={TaskFill}
                        name="Projects Tasks"
                        isActive={true}
                    />
                    <ExpandSidebarItem
                        icon={Folder}
                        name="Categories"
                    />
                    <SidebarItem
                        icon={Settings}
                        name="Settings"
                        isActive={false}
                    />
                </S.Tabs>
                <Link to="/login" style={{ textDecoration: "none" }} onClick={handleLogout}>
                    <SidebarItem
                        icon={Logout}
                        name="Logout"
                        isActive={false}
                    />
                </Link>
            </S.Sidebar>
            <S.Main>
                <S.Header>{projectName} Tasks</S.Header>
                <S.TitleAndFilter>
                    <S.Title onClick={handleDone}>Tasks</S.Title>
                    <S.FilterField>
                        <div onClick={handleAll}>
                            <FilterTag name="All" active={allActive} />
                        </div>
                        <div onClick={handleDone}>
                            <FilterTag name="Done" active={doneActive} />
                        </div>
                        <div onClick={handleNotDone}>
                            <FilterTag name="Not done" active={notDoneActive} />
                        </div>
                        <S.FilterIcon src={Filter} />
                    </S.FilterField>
                </S.TitleAndFilter>
                {listOfLists[listToDisplay]?.length > 0 ? (
                    listOfLists[listToDisplay].map(task => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            name={task.name}
                            list={task.category}
                            color={task.color}
                            done={task.isDone}
                        />
                    ))
                ) : (
                    <p>No tasks to display</p>
                )}
                <AddTask />
                <ExportAsGist projectTitle={projectName} todos={taskList} githubToken={process.env.REACT_APP_GITHUB_TOKEN || ''} />
            </S.Main>
            {showDelete && <DeleteModal />}
            {showEdit && <UpdateModal />}
            {showAdd && <AddModal />}
        </S.Page>
    );
};

export default Task;