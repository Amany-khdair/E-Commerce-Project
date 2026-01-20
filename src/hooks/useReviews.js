import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosAuthInstance from '../api/axiosAuthInstance'
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default function useReviews({ onSuccessCallback, onErrorCallback } = {}) {
    const queryClient = useQueryClient();
    const { t } =useTranslation();
    return useMutation({
        mutationFn: async ({ rating, comment, productId }) => {
            return await axiosAuthInstance.post(`Products/${productId}/reviews`,
                {                  
                    Rating: rating,
                    Comment: comment
                }
            );
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({querykey: ["productDetails", variables.productId]});            
            Swal.fire({
                title: t("Success"),
                text: t("Review added successfully!"),
                icon: "success",
                confirmButtonColor: "#DB4444",
            }); 
            if (onSuccessCallback) onSuccessCallback();         
        },
        onError: (error)=>{
            if (onErrorCallback) onErrorCallback(error);
            const serverMessage = error.response?.data?.message || t("Something went wrong");
            Swal.fire({
                title: t("Error!"),
                text: serverMessage,
                icon: 'error',
                confirmButtonText: t("Ok"),
                confirmButtonColor: '#DB4444',
            });                                    
        }
    });
}
