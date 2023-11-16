import { useLoaderData, useParams } from "react-router-dom";

import { customFetch } from "../utils";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
const url = "/products";


export const loader = async ({ request }) => {
  // console.log(request);
  /* aşagıdaki url den bilgileri almaya calışıyoruz
  http://localhost:5173/products?search=name&category=all&comapany=all&order=a-z&price=100000&shipping=on
  */
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  // console.log(params);

  // console.log(params);  // {search: 'aa', category: 'Tables', comapany: 'Luxora', order: 'a-z', price: '62000', …}

  /* 
   Bu seekilde tek tek bilgileri alabilirz (company,category,vb..)
  const params = new URL(request.url).searchParams
    const search = params.get("search")
  console.log(search); */

  const response = await customFetch(url, { params: params });

  // console.log(response);
  const products = response.data.data;
  const meta = response.data.meta;
  // console.log(products);
  return { products, meta, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
