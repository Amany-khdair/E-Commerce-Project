import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export default function useFetch (queryKey, url, params={}, instance = axiosInstance){
  const fetchData = async ()=>{
      const response = await instance.get(url, {params});       
      return response.data; 
  }

  const query = useQuery({
    queryKey:queryKey,
    staleTime:5 * 60 * 1000,
    queryFn:fetchData
  });

  return query;
}