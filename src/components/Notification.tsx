import React from "react";
import {ToastContainer} from "react-toastify";




const Toast: React.FC<{}> = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        draggable
    />
)



export default Toast;