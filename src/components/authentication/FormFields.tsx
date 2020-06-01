import { CustomInputProps } from "./CustomProps";

export const RegistrationFormFields: CustomInputProps[]  = [
    {fieldType:"input", id: "name", label:"Name", placeholder:"Name"},
    {fieldType:"input", id: "email", label:"Email", placeholder:"Email Id"},
    {fieldType:"input", warnings: true, id: "newPassword", label:"Password", placeholder:"New Password"},
    {fieldType:"button", id:"test", buttonColor:"red", placeholder:"pressme", label:"Button", onClick:"Submit"}
]

export const LoginFormFields: CustomInputProps[] = [
    {fieldType:"input", id: "name", label:"Name", placeholder:"Name"},
    {fieldType:"input", id: "email", label:"Email", placeholder:"Email Id"},
]

