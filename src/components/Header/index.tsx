import React, {useState, ReactElement, ReactNode} from 'react';
import {NavLink} from "react-router-dom";


import {Avatar, Logo, Cart} from "../";
import avatar from "../../assets/images/image-avatar.png";
import clsx from "./styles.module.css";
import {navlinks} from "./data";
import menuIcon from "../../assets/images/icon-menu.svg";
import cartImg from "../../assets/images/icon-cart.svg";
import { MobileMenu } from './components';
import { useCart } from '../../contexts/Cart';




const Header:React.FC<{}> = (): ReactElement => {
    const [open, setOpen] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const {state: {cart}} = useCart();
    const cartQty = cart.length;

    function toggleCartHandler(e: any): void {
        if(e.target.id === "cartIcon" || e.target.id === "cartBadge"){
            setOpen(old => !old);
        }
    }

    function showMobileNavHandler(e: any): void {
        setShowMobileNav(_ => true);
    }

    function hideMobileNavHandler(e: any): void {
        setShowMobileNav(_ => false);
    }
    return (
        <nav className={clsx.nav}>
            <div className={clsx.nav_left}>
                <MobileMenu closeHandler={hideMobileNavHandler} open={showMobileNav} navlinks={navlinks} />
                <img src={menuIcon} alt="Menu Icon" onClick={showMobileNavHandler} className={clsx.hamburger} />
                <NavLink to="/">
                    <Logo style={{marginRight: 40}} />
                </NavLink>

                <ul className={clsx.nav_left_items}>
                    {
                        navlinks.map(({path, title}, i) => (
                            <li key={i}>
                                <NavLink to={path}>
                                    {title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={clsx.nav_right}>
                <span className={clsx.nav_cart} onClick={toggleCartHandler}>
                    <AbsoluteContainer open={open}>
                        <Cart />
                    </AbsoluteContainer>
                    {(cartQty !== 0) && <div id="cartBadge" className={clsx.nav_cart_badge}> {cartQty} </div>}
                    <img src={cartImg} id="cartIcon" alt="Cart" />
                </span>
                <Avatar avatar={avatar} width={50} />
            </div>
            
        </nav>
    )
}



interface AbsoluteContainerInterface {
    children: ReactNode,
    open: boolean
}

function AbsoluteContainer({children, open}: AbsoluteContainerInterface): ReactElement | null {
    return (
        open ? (<div className={clsx.absolute_container}>
            {children}
        </div>) : null
    )
}



export default Header;