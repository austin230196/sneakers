import React, {useEffect, ReactElement, ReactNode} from "react";
import {motion} from "framer-motion"




interface BackdropInterface {
    open: boolean;
    children: ReactNode;
    className?: string
}


const Backdrop: React.FC<BackdropInterface> = ({open, children, ...props}: BackdropInterface): ReactElement | null => {
    const backdropStyle: object = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "var(--backdrop)",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        zIndex: 100
    }
    useEffect(() => {
        console.log("Backdrop is mounted");
        return () => console.log("Removing Backdrop");
    }, [])
    return (
        open ? <motion.div
            initial={{x: -100}}
            animate={{x: 0}}
            transition={{ease: 'easeIn', duration: .3}}
            exit={{x: -100}}
         style={backdropStyle} {...props}>
            {children}
        </motion.div> : null
    )
}




export default Backdrop;