export type CustomInputProps = {
    label: string;              //for Fields AND Buttons

    //textfields
    fieldType?: "input" | "button" | "dropdown"|"calendar";
    id:string;
    placeholder?:string;        
    minLength?: number;
    maxLength?: number;
    password?: boolean;
    warnings?: boolean;    
    
    //buttons
    buttonColor?: "red" | "orange" | "yellow" | "olive" | "green" | "teal" | "blue" | "violet" | "purple" | "pink" | "brown" | "grey" | "black" | "facebook" | "google plus" | "vk" | "twitter" | "linkedin" | "instagram" | "youtube" | undefined;
    basic?:boolean;
    onClick? : string;
}

