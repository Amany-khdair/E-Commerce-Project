import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosAuthInstance from '../api/axiosAuthInstance';

export default function useRemoveFromCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(cartItemId)=> axiosAuthInstance.delete(`/carts/${cartItemId}`),
        onSuccess:()=>{
            queryClient.invalidateQueries({querykey:['carts']} );
        }
    })
}
