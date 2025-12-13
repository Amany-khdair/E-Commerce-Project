import * as yup from 'yup'

export const resetPasswordSchema = yup.object({ 
  newPassword: yup.string().required("Password is Required")
  .min(2,"Password Must be at Least 2 Characters")
  .matches(/[A-Z]/, "Must Contain at Least One Uppercase Letter")
  .matches(/[a-z]/, "Must Contain at Least One Lowercase Letter")
  .matches(/\d/, "Must Contain at Least One Number")
  .matches(/[@#$&?!*_-]/, "Must Contain at Least One Special Character")
})