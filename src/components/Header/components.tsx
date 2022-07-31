import React, {MouseEventHandler, ReactElement} from "react";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";


import {NavLinkInterface} from "../../interfaces";
import clsx from "./styles.module.css";
import closeIcon from "../../assets/images/icon-close.svg";
import {Backdrop} from "../";



interface MobileMenuInterface {
    open: boolean;
    closeHandler: MouseEventHandler<HTMLImageElement>;
    navlinks: Array<NavLinkInterface>
}

export const MobileMenu = ({open, closeHandler, navlinks}: MobileMenuInterface): ReactElement | null  => {
    return (
       
        <Backdrop open={open} className={clsx.mobile_menu}>
            <div className={clsx.mobile_menu_container}>
                <img onClick={closeHandler} src={closeIcon} alt="Close Icon" />
                <ul>
                    {
                        navlinks.map(({title, path}, i) =>(
                            <motion.li
                            whileHover={{
                                scale: 1.04,
                                transition: {
                                    ease: "easeInOut",
                                    duration: 1
                                }
                            }}
                            key={i}>
                                <NavLink to={path}>
                                    {title}
                                </NavLink>
                            </motion.li>
                        ))
                    }
                </ul>
            </div>
        </Backdrop>
    )
} 