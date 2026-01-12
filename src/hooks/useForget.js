import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import { useTranslation } from "react-i18next";

export function useForget(){
    const navigate = useNavigate();
    const { t } = useTranslation();

    const forgetMutation = useMutation({
        mutationFn: async(data)=>{
            const result = await axiosInstance.post(`/Auth/Account/SendCode`, data);
            return result.data;
        },
        onSuccess: async(data, variables)=>{
            localStorage.setItem("resetEmail", variables.email);
            await Swal.fire({
                icon: "success",
                title: t("CheckYourEmail"),
                text: data.message,
                confirmButtonColor: "#DB4444",
            });
            navigate("/auth/verifyCode");
        },
        onError: (error)=>{     
            Swal.fire({
                icon: "error",
                title: t("Oops"),
                text:
                error.response?.data?.message ||
                t("SomethingWentWrong"),
                confirmButtonColor: "#DB4444",
            });    
        }
    });
    return forgetMutation;
}