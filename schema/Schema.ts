import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be longer than 6 characters!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be longer than 6 characters!")
    .required("Password is required!"),
});
