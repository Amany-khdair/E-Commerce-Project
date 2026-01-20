import { useMutation } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance';
import Swal from 'sweetalert2';

export default function useUpdatePassword(onSuccessCallback) {
    return useMutation({
        //passwordData
        mutationFn: async (data) => {
            return await axiosAuthInstance.patch('/Profile/change-password', data);
        },
        onSuccess: () => {
            Swal.fire({ icon: 'success', title: 'Password Changed!', text: 'Your security is updated.', timer: 2000, showConfirmButton: false });           
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            Swal.fire({ icon: 'error', title: 'Failed to Change Password', text: error.response?.data?.message || "Current password might be wrong" });
        }
    });
}
