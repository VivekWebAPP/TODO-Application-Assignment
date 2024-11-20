import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";


const Sigin: React.FC = () => {
    const { handleSigin, setuserSigin } = useContext(AuthContext) as AuthType;
    const [userData, setuserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const nagivate = useNavigate();

    async function handleUserLogin() {
        setuserSigin({ name: userData.name, email: userData.email, password: userData.password })
        const response = await handleSigin(userData.name, userData.email, userData.password);
        if (response) {
            nagivate('/login');
        }
    }


    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setuserData({ ...userData, [event.target.name]: event.target.value })
    }

    return (
        <S.Page>
            <S.LeftSide>
                <S.Img src={Logo}></S.Img>
            </S.LeftSide>
            <S.RightSide>
                <S.Title>Welcome to Tasker</S.Title>
                <S.Subtitle>Please, insert your informations to access your tasks.</S.Subtitle>
                <S.FieldName >Name</S.FieldName>
                <S.InputField value={userData.name} id="name" name="name" onChange={handleOnChange} placeholder="Insert your name"></S.InputField>
                <S.FieldName >Email</S.FieldName>
                <S.InputField value={userData.email} id="email" name="email" onChange={handleOnChange} placeholder="Insert your email"></S.InputField>
                <S.FieldName>Password</S.FieldName>
                <S.InputField placeholder="Insert your password" name="password" value={userData.password} onChange={handleOnChange} type="password"></S.InputField>
                <S.KeepSigned><S.Checkbox /><S.Subtitle>Remember me</S.Subtitle></S.KeepSigned>
                <S.SignIn onClick={handleUserLogin}>Sign Up</S.SignIn>
                <S.Subtitle>Don't have an account? <Link to={'/login'}>Sign In</Link></S.Subtitle>
            </S.RightSide>
        </S.Page>
    )
};

export default Sigin;