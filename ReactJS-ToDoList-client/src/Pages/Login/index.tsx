import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";


const Login: React.FC = () => {
    const { handleLogin, setuserLogin } = useContext(AuthContext) as AuthType;
    const [userData, setuserData] = useState({
        email: '',
        password: '',
    });
    const nagivate = useNavigate();

    async function handleUserLogin() {
        // localStorage.setItem('@Project:email', userData.email);
        setuserLogin({ email: userData.email, password: userData.password })
        const response = await handleLogin(userData.email, userData.password);
        console.log(response, localStorage.getItem('un'));
        if (response) {
            nagivate('/');
            window.location.reload();
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
                <S.FieldName >Email</S.FieldName>
                <S.InputField value={userData.email} id="email" name="email" onChange={handleOnChange} placeholder="Insert your email"></S.InputField>
                <S.FieldName>Password</S.FieldName>
                <S.InputField placeholder="Insert your password" name="password" value={userData.password} onChange={handleOnChange} type="password"></S.InputField>
                <S.KeepSigned><S.Checkbox /><S.Subtitle>Remember me</S.Subtitle></S.KeepSigned>
                <S.SignIn onClick={handleUserLogin}>Sign In</S.SignIn>
                <S.Subtitle>Don't have an account? <Link to={'/sigin'}>Sign Up</Link></S.Subtitle>
            </S.RightSide>
        </S.Page>
    )
};

export default Login;