import React, {useContext, createContext, ReactNode, ReactElement, useState} from "react";


import {StateInterface, ContextInterface, CartItem} from "../interfaces";
import img from "../assets/images/image-product-1-thumbnail.jpg";

const CartContext = createContext<ContextInterface>({
    state: {
        cart: []
    },
    removeFromCart: function(id: number): Promise<boolean>{
        return new Promise(resolve => { resolve(false)});
    },
    addToCart: function(item: CartItem): Promise<boolean>{
        return new Promise(resolve => { resolve(false)});
    }
});

export const useCart = () => useContext(CartContext);


interface PropsInterface {
    children: ReactNode
}



const CartContextProvider: React.FC<PropsInterface> = ({children}: PropsInterface): ReactElement => {
    const [state, setState] = useState<StateInterface>({
        cart:[
            {
                id: 0,
                image: img,
                name: "Fall Limited Edition Sneakers",
                price: 125,
                qty: 3
            }
        ]
    })
    async function removeFromCart(id: number): Promise<boolean> {
        try{
            //first we get the cart items;
            const copy = [...state.cart];
            let todelete = copy.findIndex(c => c.id === id);
            if(todelete < 0) return false;
            else {
                let _ = copy.splice(todelete, 1);
                setState(old => {
                    return {
                        ...old,
                        cart: [...copy]
                    }
                })
                return true;
            }
        }catch(err: any){
            console.log(err.message);
            return false;
        }
    } 

    async function addToCart(item: CartItem): Promise<boolean> {
        try{
            let copy = [...state.cart];
            copy.push(item);
            setState(old => {
                return {
                    ...old,
                    cart: [...copy]
                }
            })
            return false;
        }catch(err: any){
            console.log(err.message);
            return false;
        }
    }
    return (
        <CartContext.Provider value={{state, removeFromCart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}



export default CartContextProvider;