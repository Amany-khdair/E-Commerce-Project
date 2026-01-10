import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosAuthInstance from '../api/axiosAuthInstance';

export default function useClearCart() {
 const queryClient = useQueryClient();
    return useMutation({
        mutationFn:()=> axiosAuthInstance.delete('/carts/clear'),
        onSuccess:()=>{
            queryClient.invalidateQueries({querykey:['carts']} );
        }
    })
}
