import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return useMutation({
        mutationFn:async({paymentMethod})=>{
            return await axiosAuthInstance.post('/checkouts', {paymentMethod})
        },
        onSuccess:(response)=>{
            queryClient.invalidateQueries({queryKey:['carts']});
           if(response.data.url){
            location.href = response.data.url;
           }
           const message = response?.message ||
                t("OrderOnTheWay");
           
                 Swal.fire({
                   title: t("OrderPlaced"),
                   text: message,
                   icon: "success",
                   confirmButtonText: t("ContinueShopping"),
                   confirmButtonColor: "#DB4444",
                 }).then(() => {
                   navigate("/allproducts");
                 });                       

        },
        onError: () => {
            Swal.fire({
            title: t("Error"),
            text: t("SomethingWentWrongCheckOut"),
            icon: "error",
            confirmButtonColor: "#DB4444",
            });
        },
    }
  )
}
