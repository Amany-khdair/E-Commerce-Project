import React from 'react'
import useFetch from "./useFetch";
import i18n from "../i18n";

export function useProductByCategory(id) {
  return useFetch(['productsByCategory', id, i18n.language], `/Products/category/${id}`);
}