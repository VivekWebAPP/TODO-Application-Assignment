import React, { useState, createContext } from "react";
import { ChildrenProps } from "./deleteContext";
import { login, sigin } from "../API/loginAndSigin";

export interface UserDataProps {
    email: string,
    password: string,
}

export interface UserSiginProps {
    name: string,
    email: string,
    password: string,
}

export type AuthType = {
    userLogin: UserDataProps,
    userSigin: UserSiginProps,
    setuserLogin: Function,
    setuserSigin: Function,
    handleLogin: Function,
    handleSigin: Function,
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {

    const [userLogin, setuserLogin] = useState({
        email: '',
        password: '',
    });
    const [userSigin, setuserSigin] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        localStorage.setItem('AuthToken', response.jwtToken);
        return response.jwtToken;
    }

    const handleSigin = async (name: string, email: string, password: string) => {
        const response = await sigin(name, email, password);
        return response.jwtToken;
    }

    return (
        <AuthContext.Provider value={{ userLogin, userSigin, setuserLogin, setuserSigin, handleLogin, handleSigin }} >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContext;