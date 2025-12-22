import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export function useCategories (){
    const fetchCategories = async ()=>{
        const response = await axiosInstance.get('/Categories');
        return response.data;
  }
  const {isLoading, isError, data} = useQuery({
    queryKey:['categories'],
    staleTime:5 * 60 * 1000,
    queryFn:fetchCategories
  });

  return {isLoading, isError, data};
}