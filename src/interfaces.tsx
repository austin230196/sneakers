import { MouseEventHandler } from "react";


export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    qty: number;
}


export interface StateInterface {
    cart: Array<CartItem>
}


export interface NavLinkInterface {
    title: string;
    path: string;
}

export interface ContextInterface {
    state: StateInterface,
    removeFromCart: (id: number) => Promise<boolean>;
    addToCart: (item: CartItem) =>  Promise<boolean>;
}