import { RouterProvider, createBrowserRouter } from "react-router-dom";


import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";
//loaders
import {loader as landingLoader} from "./pages/Landing"
import {loader as singleProductLoader} from "./pages/SingleProduct"
import {loader as productsLoader} from "./pages/Products"

//actions


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement/>,
        loader: landingLoader, // return products (fatured products)
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement/>,
        loader: productsLoader,  // return products and meta

      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement/>,
        loader: singleProductLoader, //return product

      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorElement/>

      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement/>

      },
      {
        path: "checkout",
        element: <Checkout />,
        errorElement: <ErrorElement/>

      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorElement/>

      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    

  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <About />
    </RouterProvider>
  );
}

export default App;
