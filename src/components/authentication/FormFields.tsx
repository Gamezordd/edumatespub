import React from "react";
import { InputProps, StickyProps } from "semantic-ui-react";

type CustomInputProps = {
    fieldType?: "input" | "button" | "dropdown";
    id:string;
    placeholder?:string;
    onChange?: string;
    onClick? : string;
    minLength?: number;
    password?: boolean;
    warnings?: boolean;    
    label: string;
}

export const AmbassadorEssentialFields: CustomInputProps[] = [
    {fieldType:"input", id: "name", label:"Name", placeholder:"Name", onChange:"name"},
    {fieldType:"input", id: "email", label:"Email", placeholder:"Email Id", onChange:"email"},
    {fieldType:"input", warnings: true, id: "newPassword", label:"Password", placeholder:"New Password", onChange:"password"},
]
