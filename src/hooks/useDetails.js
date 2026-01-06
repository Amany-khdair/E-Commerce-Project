import { useQuery } from "@tanstack/react-query";
//import axiosInstance from "../api/axiosInstance";
import axios from "axios";

export function useDetails(id){
    const fetchProduct = async ()=> {        
        
        const response = await axios.get(`https://dummyjson.com/products/${id}`);        
        return response.data;
        //const response = await axiosInstance.get(`/products/${id}`);
        //return response.data.response;
    };
    
    const {isLoading, isError, data} = useQuery({
        queryKey:['product', id],
        staleTime:5 * 60 * 1000,
        queryFn:fetchProduct
    })
    return {isLoading, isError, data};
}