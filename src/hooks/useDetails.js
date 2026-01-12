import i18n from "../i18n";
import useFetch from "./useFetch";

export function useDetails(id){
    return useFetch(['product', id, i18n.language], `products/${id}`);
}