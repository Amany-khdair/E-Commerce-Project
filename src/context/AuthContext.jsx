import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const logout = ()=>{
        localStorage.removeItem("token");
        setToken(null);
    }

    const setAccessToken = (token) => {
        localStorage.setItem("token", token);}
    return <AuthContext.Provider value={{token, setToken, logout, setAccessToken}}>
        {children}
    </AuthContext.Provider>
}