import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

export function useForget(){
    const navigate = useNavigate();
    const forgetMutation = useMutation({
        mutationFn: async(data)=>{
            const result = await axiosInstance.post(`/Auth/Account/SendCode`, data);
            return result.data;
        },
        onSuccess: async(data, variables)=>{
            localStorage.setItem("resetEmail", variables.email);
            await Swal.fire({
                icon: "success",
                title: "Check Your Email!",
                text: data.message,
                confirmButtonColor: "#DB4444",
            });
            navigate("/auth/verifyCode");
        },
        onError: (error)=>{     
            Swal.fire({
                icon: "error",
                title: "Oops 😕",
                text:
                error.response?.data?.message ||
                "Something went wrong, please try again",
                confirmButtonColor: "#DB4444",
            });    
        }
    });
    return forgetMutation;
}