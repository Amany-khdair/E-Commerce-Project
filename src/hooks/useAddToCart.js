import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../api/axiosAuthInstance'

export default function useAddToCart() {
    const queryClient = useQueryClient();
    const addToCartMutation = useMutation({
        mutationFn: async({ProductId, Count})=>{
            return await axiosAuthInstance.post('/Carts',{
                ProductId,
                Count
            })
        },onSuccess:()=>{
            queryClient.invalidateQueries({querykey:['carts']} );
        }
    })
  
    return addToCartMutation;
}
