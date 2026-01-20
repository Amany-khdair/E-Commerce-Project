import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance';
import Swal from 'sweetalert2';

export default function useUpdateEmail(onSuccessCallback) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({NewEmail}) =>{
            return await axiosAuthInstance.patch('/Profile/change-email', {NewEmail});
        }, onSuccess: ()=>{
            queryClient.invalidateQueries({querykey: ['profile']});
            Swal.fire({ icon: 'success', title: 'The process to change you email is almost done! check your new email!', timer: 1500, showConfirmButton: false });
            if (onSuccessCallback) onSuccessCallback();
        }, onError: (error) => {
            Swal.fire({ icon: 'error', title: 'Email Change Failed', text: error.response?.data?.message || "Invalid Email" });
        }
    });
}
