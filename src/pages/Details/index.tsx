import React, {useEffect, ReactElement, ReactNode, useState, MouseEventHandler} from "react";
import {MdClose, MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {AiOutlineShoppingCart} from "react-icons/ai";



import img1 from "../../assets/images/image-product-1-thumbnail.jpg";
import img2 from "../../assets/images/image-product-2-thumbnail.jpg";
import img3 from "../../assets/images/image-product-3-thumbnail.jpg";
import img4 from "../../assets/images/image-product-4-thumbnail.jpg";
import lgImg1 from "../../assets/images/image-product-1.jpg";
import lgImg2 from "../../assets/images/image-product-2.jpg";
import lgImg3 from "../../assets/images/image-product-3.jpg";
import lgImg4 from "../../assets/images/image-product-4.jpg";
import add from "../../assets/images/icon-plus.svg";
import minus from "../../assets/images/icon-minus.svg";
import clsx from "./styles.module.css";
import { Button, Backdrop } from "../../components";
import {useProduct} from "../../contexts/Product";
import {useCart} from "../../contexts/Cart";



const images: Array<string> = [
    img1,
    img2,
    img3,
    img4
]

const lgImages: Array<string> = [
    lgImg1,
    lgImg2,
    lgImg3,
    lgImg4
]

interface ControlInterface {
    onClick: MouseEventHandler<HTMLSpanElement>;
    style: object,
    children: ReactNode
}

function Control({onClick, children, ...props}: ControlInterface): ReactElement {
    return (
        <span onClick={onClick} {...props} className={clsx.image_control}>
            {children}
        </span>
    )
}


const Details: React.FC<{}> = (): ReactElement => {
    const [display, setDisplay] = useState<number>(0);
    const [zoom, setZoom] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(0);
    const {state: {products}} = useProduct();
    const {addToCart} = useCart();
    let product = products[0];
    let data = {
        id: 0,
        name: product.name,
        image: img1,
        price: product.newPrice
    }

    useEffect(() => {
        console.log("Details Page is mounted");
        console.log(qty);
        return () => console.log("Removing Details Page");
    }, [])


    function showZoomHandler (e: object): void {
        setZoom(_ => true);
    }


    function hideZoomHandler(e: object): void {
        setZoom(_ => false);
    }


    function showImageHandler(e: object, index: number): void {
        if(index === display) return;
        setDisplay(_ => index);
    }

    function increaseQty(e: object): void{
        setQty(old => old + 1);
    }


    function decreaseQty(e: object): void{
        setQty(old => old === 0 ? old : old - 1);
    }

    function nextImageHandler(e: object): void {
        setDisplay(old => old === (lgImages.length - 1) ? 0 : old + 1);
    }


    function prevImageHandler(e: object): void {
        setDisplay(old => old === 0 ? (lgImages.length - 1) : old - 1);
    }



    return(
        <div className={clsx.details}>
            <div className="container w-100">
                <Backdrop open={zoom}>
                    <div className={clsx.image_zoom}>
                        <div className={clsx.image_display} style={{position: 'relative'}}>
                            <MdClose className={clsx.backdrop_close} onClick={hideZoomHandler} />
                            <Control onClick={nextImageHandler} style={{right: -15}}>
                                <MdArrowForwardIos />
                            </Control>
                            <Control onClick={prevImageHandler} style={{ left : -15}} >
                                <MdArrowBackIos />
                            </Control>
                            <img onClick={showZoomHandler} src={lgImages[display]} alt="Image Display" />
                            <div className={clsx.images}>
                                {
                                    images.map((img, i) => (
                                        <span key={i} onClick={e => showImageHandler(e, i)}>
                                            {i === display && <div className={clsx.overlay}></div>}
                                            <img src={img} alt={"Image " + i} />
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Backdrop>
                <div className="row w-100">
                    <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
                        <div className={clsx.image_display}>
                            <img onClick={showZoomHandler} src={lgImages[display]} alt="Image Display" />
                            <div className={clsx.images}>
                                {
                                    images.map((img, i) => (
                                        <span key={i} onClick={e => showImageHandler(e, i)}>
                                            {i === display && <div className={clsx.overlay}></div>}
                                            <img src={img} alt={"Image " + i} />
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12">
                        <div className={clsx.image_metadata}>
                            <h3>Sneaker Company</h3>
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                            <div className={clsx.image_metadata_bottom}>
                                <div className={clsx.price}>
                                    <div>
                                        <h4>{new Intl.NumberFormat('en-us', {style: 'currency', currency: "USD"}).format(product.newPrice)}</h4>
                                        <h6>{new Intl.NumberFormat('en-us', {style: 'currency', currency: "USD"}).format(product.oldPrice)}</h6>
                                    </div>
                                    <span>
                                        50%
                                    </span>
                                </div>

                                <div className={clsx.controls}>
                                    <div className={clsx.control_qty}>
                                        <img src={add} onClick={increaseQty} alt="Add" />
                                        {qty}
                                        <img src={minus} onClick={decreaseQty} alt="Minus" />
                                    </div>
                                    <Button onClick={(_: any) => addToCart({
                                        ...data,
                                        qty
                                    })} disabled={qty === 0 ? true : false} text="Add to Cart" icon={<AiOutlineShoppingCart />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Details;