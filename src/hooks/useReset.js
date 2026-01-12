import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useReset(){
    const navigate = useNavigate();
    const { t } = useTranslation();

    const resetMutation = useMutation({
      mutationFn: async(sendData)=>{
        const result = await axiosInstance.patch(`/Auth/Account/ResetPassword`, sendData);
        return result.data;
      },
      onSuccess: async(data)=>{
        await Swal.fire({
            icon: "success",
            title: t("Success"),
            text: data.message,
            confirmButtonColor: "#DB4444",
        });
        navigate("/auth/login");
      },
      onError:(err)=>{
            Swal.fire({
              icon: "error",
              title: t("Oops"),
              text:
                err.response?.data?.message ||
                t("SomethingWentWrong"),
              confirmButtonColor: "#DB4444",
            });        
      }
    });
    return resetMutation;
}