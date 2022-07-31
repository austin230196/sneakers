import React, {ReactElement} from "react";



interface PropsInterface {
    width?: number;
    height?: number;
    avatar: string;
    boxStyle?: object;
    imgStyle?: object
}


const Avatar: React.FC<PropsInterface> = ({width, height, avatar, boxStyle={}, imgStyle={}}: PropsInterface): ReactElement => {
    const constraints = width || height ? {
        width,
        height
    } : {};
    const _boxStyle = {
        ...constraints,
        ...boxStyle,
        borderRadius: "50%",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden"
    }
    const _imgStyle = {
        ...constraints,
        ...imgStyle
    }
    return (
        <span style={_boxStyle} onMouseOver={e => {
            e.currentTarget.style.border = "2px solid var(--primary)"
        }} onMouseOut={e => {
            e.currentTarget.style.border = "none";
        }}>
            <img src={avatar} style={_imgStyle} alt="Avatar" />
        </span>
    )
}



export default Avatar;