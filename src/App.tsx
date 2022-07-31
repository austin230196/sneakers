import React, {useEffect, ReactElement} from 'react';
import {Routes, Route} from "react-router-dom";

import {Header, Toast} from "./components";
import {CartContextProvider, ProductContextProvider} from "./contexts";
import {Details} from "./pages";

function App(): ReactElement {
  useEffect(() => {
    console.log("App is mounted");
    document.title = "Sneakers";
    return () => console.log("App is unmounted");
  }, [])
  return (
    <CartContextProvider>
      <ProductContextProvider>
        <div className="app">
          <Toast />
          <Header />
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </div>
      </ProductContextProvider>
    </CartContextProvider>
  );
}

export default App;
