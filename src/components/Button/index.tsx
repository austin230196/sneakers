import React, {MouseEventHandler, ReactElement, ReactNode} from "react";



import clsx from "./styles.module.css";


interface ButtonInterface {
    text: string;
    disabled: boolean;
    icon?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}


const Button: React.FC<ButtonInterface> = ({icon, className, text, ...props}: ButtonInterface): ReactElement => {
    return (
        <button className={`${clsx.button} ${className}`} {...props}>
            {icon && icon}
            &nbsp;
            &nbsp;
            {text}
        </button>
    )
}




export default Button;