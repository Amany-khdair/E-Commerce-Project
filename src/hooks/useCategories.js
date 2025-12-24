import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export function useCategories (){
    const fetchCategories = async ()=>{
        const response = await axiosInstance.get('/Categories');
        if (!response.data.response || !Array.isArray(response.data.response)) {
          throw new Error("Invalid API structure. Please try again later!");
        }
        return response.data.response;
  }
  const {isLoading, isError, data} = useQuery({
    queryKey:['categories'],
    staleTime:5 * 60 * 1000,
    queryFn:fetchCategories
  });

  return {isLoading, isError, data};
}