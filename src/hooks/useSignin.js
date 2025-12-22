import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export function useSignin(){
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({email: "", password: ""});
    const [generalError, setGeneralError] = useState("");
    const {setToken, setAccessToken} = useContext(AuthContext);
    
    const loginMutation = useMutation({
    mutationFn: async(values)=>{
        return await axiosInstance.post(`/Auth/Account/Login`, values);
    },
    onSuccess: (response)=>{
        setToken(response.data.accessToken);
        setAccessToken(response.data.accessToken);
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