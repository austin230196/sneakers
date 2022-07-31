import React, {ReactElement} from 'react';

import logo from "../assets/images/logo.svg";


interface PropsInterface {
    width?: number;
    height?: number;
    style?: object;
}

const Logo: React.FC<PropsInterface> = ({width, height, style}: PropsInterface): ReactElement => {
    const constraints = width && height ? {
        width,
        height
    } : {};
    const boxStyle = {
        ...constraints,
        ...style,
        display: "inline-block",
    }
    const imgStyle = {
        ...constraints,
    }
    return (
        <div style={boxStyle}>
            <img src={logo} alt="LOGO" style={imgStyle} />
        </div>
    )
}



export default Logo;