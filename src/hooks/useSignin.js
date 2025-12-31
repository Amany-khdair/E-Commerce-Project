import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import { jwtDecode } from 'jwt-decode';

export function useSignin(){
    const navigate = useNavigate();
    const setToken = useAuthStore((state)=>state.setToken);
    const setUser = useAuthStore((state)=>state.setUser);

    const [fieldErrors, setFieldErrors] = useState({email: "", password: ""});
    const [generalError, setGeneralError] = useState("");    
    
    const loginMutation = useMutation({
    mutationFn: async(values)=>{
        return await axiosInstance.post(`/Auth/Account/Login`, values);
    },
    onSuccess: (response)=>{
        const accessToken = response.data.accessToken;
        const decoded = jwtDecode(accessToken);
        const user = {
            name:decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role:decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        }
        console.log(decoded);
        setToken(accessToken);
        setUser(user);
        navigate('/home');
    },
    onError: (error)=>{
        const serverErrors = error.response?.data?.errors || [];
       setGeneralError (error.response?.data?.message || "Something went wrong");

        const newErrors = {
        email: "",
        password: "",
        };

        serverErrors.forEach((err) => {
        if (err.toLowerCase().includes("email")) {
            newErrors.email = err;
        } else if (err.toLowerCase().includes("password")) {
            newErrors.password = err;
        } else {
            newErrors.general = err;
        }
        });

        setFieldErrors(newErrors);
    
    }
    })
    return {fieldErrors, setFieldErrors, generalError, loginMutation};
}