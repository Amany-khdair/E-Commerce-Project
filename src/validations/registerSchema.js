import * as yup from 'yup'

export const registerSchema = yup.object({
  fullName: yup.string().required("Full Name is Required"),
  userName: yup.string().matches(/^[a-zA-Z0-9._-]+$/, "Invalid User Name")
  .min(4, "User Name Mut be at Least 4 Characters")
  .required("User Name is Required"),
  email: yup.string().email("Invalid Email Format").required("Email is Required"),
  password: yup.string().required("Password is Required")
  .min(2,"Password Must be at Least 2 Characters")
  .matches(/[A-Z]/, "Must Contain at Least One Uppercase Letter")
  .matches(/[a-z]/, "Must Contain at Least One Lowercase Letter")
  .matches(/\d/, "Must Contain at Least One Number")
  .matches(/[@#$&?!*_-]/, "Must Contain at Least One Special Character"),
  phoneNumber: yup.string().required("Phone Number is Required")
})