import React, {createContext, useContext, useState, ReactNode, ReactElement} from "react";


const ProductContext = createContext<IProductProvider>({
    state: {
        products: []
    }
})


interface IProductState {
    products: Array<IProduct>
}

interface IProductProvider {
    state: IProductState;
    setState?: Function;
}


interface IProduct {
    name: string;
    description: string;
    newPrice: number;
    oldPrice: number;
}



export const useProduct = () => useContext(ProductContext);


interface IProps {
    children: ReactNode;
}


const ProductContextProvider = ({children}: IProps): ReactElement => {
    const [state, setState] = useState<IProductState>({
        products: [
            {
                name: "Fall Limited Edition Sneakers",
                description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand anything the weather has to offer.",
                newPrice: 125,
                oldPrice: 250
            }
        ]
    })
    return (
        <ProductContext.Provider value={{state, setState}}>
            {children}
        </ProductContext.Provider>
    )
}





export default ProductContextProvider;