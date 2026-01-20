import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance';
import Swal from 'sweetalert2';

export default function useUpdateProfile(onSuccessCallback) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(data) =>{
            return await axiosAuthInstance.patch('/Profile', data);
        }, onSuccess: () =>{
            queryClient.invalidateQueries({ querykey: ['profile'] });
            Swal.fire({ icon: 'success', title: 'Profile Updated!', timer: 1500, showConfirmButton: false });
            if (onSuccessCallback) onSuccessCallback();
        }, onError: (error) =>{
            Swal.fire({ icon: 'error', title: 'Update Failed', text: error.response?.data?.message || "Check your data" });
        }
    });
}
