import React, { useContext, useState } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/taskFill.png";
import Settings from "../../Img/settings.svg";
import Logout from "../../Img/logout.svg";
import SidebarItem from "../../Components/SidebarItem";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { Link } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { ProjectListContext } from "../../Contexts/projectListContext";
import { ProjectListType } from "../../Contexts/ProjectListType";
import { DeleteProjectContext } from "../../Contexts/deleteProjectContext";
import { DeleteProjectType } from "../../Contexts/deleteProjectType";
import ProjectCard from "../../Components/ProjectCard";
import { EditProjectContext } from "../../Contexts/updateProjectContext";
import { EditProjectType } from "../../Contexts/editProjectType";
import { AddProjectContext } from "../../Contexts/addProjectContext";
import { addProjectType } from "../../Contexts/addProjectType";
import UpdateModalProject from "../../Components/UpdateProjectModal";
import AddProjectModal from "../../Components/AddProjectModal";
import DeleteProjectModal from "../../Components/DeletionProjectModel";
import AddProject from "../../Components/AddProject";


const Home: React.FC = () => {
    const { projectList = [] } = useContext(ProjectListContext) as ProjectListType;
    const { showProjectDelete } = useContext(DeleteProjectContext) as DeleteProjectType;
    const { showEditProject } = useContext(EditProjectContext) as EditProjectType;
    const { showProject } = useContext(AddProjectContext) as addProjectType;
    const [listToDisplay, setListToDisplay] = useState(0);
    const listOfLists = [projectList];
    const [allActive, setAllActive] = useState(true);
    const [doneActive, setDoneActive] = useState(false);
    const [notDoneActive, setNotDoneActive] = useState(false);

    const { setuserLogin } = useContext(AuthContext) as AuthType;

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
                        name="Projects"
                        isActive={true}
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
                <S.Header>All Your Projects</S.Header>
                <S.TitleAndFilter>
                    <S.Title onClick={handleDone}>Projects </S.Title>
                    <S.FilterField>
                        <div onClick={handleAll}>
                            <FilterTag name="All" active={allActive} />
                        </div>
                        <S.FilterIcon src={Filter} />
                    </S.FilterField>
                </S.TitleAndFilter>
                {listOfLists[listToDisplay]?.length > 0 ? (
                    projectList.map(task => (
                        <ProjectCard
                            key={task._id}
                            id={task._id}
                            name={task.name}
                            creationDate={task.creationDate}
                            creationTime={task.creationTime}
                        />
                    ))
                ) : (
                    <p>No Projects to display</p>
                )}
                <AddProject />
            </S.Main>
            {showProjectDelete && <DeleteProjectModal />}
            {showEditProject && <UpdateModalProject />}
            {showProject && <AddProjectModal />}
        </S.Page>
    );
};

export default Home;
