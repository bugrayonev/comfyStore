import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";

// paramsdan "id"yi almak içi için 1.method import { useParams } from "react-router-dom"
// const {id}= useParams()  dan alabiliriz.  bu işlemi singleproduct içinde yapmamız lazım yada
// aşağıdaki gibi "loader" un içinden yakalayabiliriz.
export const loader = async ({ params }) => {
  const { id } = params;

  // console.log(params);
  const response = await customFetch(`/products/${id}`);

  return { product: response.data.data };
};




const SingleProduct = () => {
  const { product } = useLoaderData();
  // console.log(product);
  const { image, title, price, description, colors, company } =
    product.attributes;
    console.log(product);

  const dollarsAmount = formatPrice(price);

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(7);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section>
      <div className="text-mb breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* Products */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* product info */}
        <div>
          <h1 className="capitalize text-3xl font-bold"> {title} </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {" "}
            {company}{" "}
          </h4>
          <p className="mt-2 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {" "}
              {colors.map((color) => {
                return (
                  <button
                    onClick={() => setProductColor(color)}
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary "
                    }`}
                    style={{ backgroundColor: `${color}` }}
                  ></button>
                );
              })}{" "}
            </div>
          </div>
          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
              
            </label>
            <select
                className="select select-secondary select-bordered select-md"
                id="amount"
                value={amount}
                onChange={handleAmount}
              >
                
             {generateAmountOptions(10)}
                
              </select>
          </div>
          {/* Cart Btn */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={()=> console.log("add to bag")}>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
