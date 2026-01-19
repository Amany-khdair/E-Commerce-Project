import React from 'react'
import useFetch from './useFetch'
import i18n from '../i18n'
import axiosAuthInstance from '../api/axiosAuthInstance'

export default function useProfile(page = 1) {
  return useFetch(['account', i18n.language, page], '/profile', {}, axiosAuthInstance);
}
