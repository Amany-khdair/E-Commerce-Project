import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useReset(){
    const navigate = useNavigate();
    const resetMutation = useMutation({
      mutationFn: async(sendData)=>{
        const result = await axiosInstance.patch(`/Auth/Account/ResetPassword`, sendData);
        return result.data;
      },
      onSuccess: async(data)=>{
        await Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
            confirmButtonColor: "#DB4444",
        });
        navigate("/auth/login");
      },
      onError:(err)=>{
            Swal.fire({
              icon: "error",
              title: "Oops 😕",
              text:
                err.response?.data?.message ||
                "Something went wrong, please try again",
              confirmButtonColor: "#DB4444",
            });        
      }
    });
    return resetMutation;
}