import React, { useContext, useEffect } from "react";
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { CartContext } from "./Cart/CartProvider";

const SingleProduct = ({ match }) => {
  const { product, isLoading, setSingleProduct } = useProducts();
  const { addToCart } = useContext(CartContext);
  const { id } = match.params;

  useEffect(() => {
    setSingleProduct(id);
  }, []);

  return (
    <div className="singleProductContainer" key={product.id}>
      {isLoading ? (
        <div className="loading">Loading Product...</div>
      ) : (
        <div className="singleProductCard">
          <div>
            <Product product={product} />
          </div>
          <div className="single-product-addToCart">
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
