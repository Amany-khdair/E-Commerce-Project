import useFetch from "./useFetch";

export function useDetails(id){
    return useFetch(['product', id], `products/${id}`);
}