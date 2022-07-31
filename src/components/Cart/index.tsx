import React, {ReactElement} from 'react';
import {toast} from "react-toastify";
import {motion} from "framer-motion";



import clsx from "./styles.module.css";
import {useCart} from "../../contexts/Cart";
import {CartItem as CartItemInterface, ContextInterface, StateInterface} from "../../interfaces";
import deleteIcon from "../../assets/images/icon-delete.svg";
import {Button} from "../";



interface PropsInterface {
    // open?: boolean;
}




const Cart: React.FC<PropsInterface> = ({}: PropsInterface): ReactElement | null => {
    const cartData = useCart();
    const {cart} = cartData.state;

    return (
        <motion.div
        initial={{y: -100}}
        animate={{y: 0}}
        transition= {{
            ease: "easeInOut",
            duration: .3
        }}
         className={clsx.cart}>
            <div className={clsx.cart_top}>
                <h2>Cart</h2>
            </div>
            <div className={clsx.cart_body}>
                {cart.length > 0 ? 
                (<>
                    {
                        cart.map(({id, image, name, price, qty}, i) => (
                            <CartItem id={id} key={i} image={image} name={name} price={price} qty={qty} />
                        ))
                    }

                    <div className={clsx.cart_button}>
                        <Button disabled={false} text="Checkout" />
                    </div>
                </>) : <h3>Your cart is empty</h3> }
            </div>
        </motion.div>
    )
}



function CartItem ({image, name, price, qty, ...props}: CartItemInterface): ReactElement {
    const {removeFromCart} = useCart();
    return (
        <div className={clsx.cart_item}>
            <div className={clsx.cart_img}>
                <img src={image} alt="Cart Item" />
            </div>
            <div className={clsx.cart_meta}>
                <h4>{name}</h4>
                <p>{`${new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(price)} x ${qty}`} 
                &nbsp; <b>{new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(price * qty)}</b></p>
            </div>
            <img src={deleteIcon} onClick={async e => {
                let hasRemoved = await removeFromCart(props.id);
                if(hasRemoved){
                    toast.success("Removed item from cart successfully")
                }else {
                    toast.error("Couldn't remove item from cart");
                }
            }} alt="Delete Icon" />
        </div>
    )
}


export default Cart;