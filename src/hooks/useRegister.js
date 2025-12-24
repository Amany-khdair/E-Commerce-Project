import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export function useRegister(){
    const navigate = useNavigate();
    const [generalError, setGeneralError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const registerMutation = useMutation({
        mutationFn:async(values)=>{
            return await axiosInstance.post(`/Auth/Account/Register`, values);
        },
        onSuccess:()=>{
            navigate("/auth/login");
        },
        onError:(error)=>{
            const serverErrors = error.response?.data?.errors || [];
            setGeneralError(error.response?.data?.message || "Something went wrong. Please try again later.");
            const newErrors = {
            userName: "",
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            };

            serverErrors.forEach((err) => {
            const lowerErr = err.toLowerCase();

            if (lowerErr.includes("email")) {
                newErrors.email = err;
            } else if (lowerErr.includes("password")) {
                newErrors.password = err;
            } else if (lowerErr.includes("name")) {
                newErrors.userName = err;
            } else if (lowerErr.includes("phone")) {
                newErrors.phoneNumber = err;
            }
            });

            setFieldErrors(newErrors);
        },
    });


    return {fieldErrors, setFieldErrors, generalError, registerMutation};
}