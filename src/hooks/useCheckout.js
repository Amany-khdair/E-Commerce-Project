import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
                   "Your order is on the way! Expect a call from us shortly.";
           
                 Swal.fire({
                   title: "Order Placed 🎉",
                   text: message,
                   icon: "success",
                   confirmButtonText: "Continue Shopping",
                   confirmButtonColor: "#DB4444",
                 }).then(() => {
                   navigate("/allproducts");
                 });                       

        },
        onError: () => {
            Swal.fire({
            title: "Error",
            text: "Something went wrong, please try again.",
            icon: "error",
            confirmButtonColor: "#DB4444",
            });
        },
    }
  )
}
