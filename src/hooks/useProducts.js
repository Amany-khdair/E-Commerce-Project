import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export function useProducts (){
    const fetchProducts = async ()=>{
        const response = await axios.get('https://dummyjson.com/products?limit=180');
        return response.data.products;
    }
    const {isLoading, isError, data} = useQuery({
        queryKey:['products'],
        staleTime:5 * 60 * 1000,
        queryFn:fetchProducts
    })
    return {isLoading, isError, data};
}