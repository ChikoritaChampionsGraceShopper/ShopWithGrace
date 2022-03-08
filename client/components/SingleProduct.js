import React, { useContext, useEffect } from "react";
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { CartContext } from "./Cart/CartProvider";
import { Link } from "react-router-dom";


const SingleProduct = ({match}) => {
  const { product, isLoading, setSingleProduct } = useProducts()
  const { updateCart } = useCart()
  const { id } = match.params
  const state = useContext(CartContext)

  useEffect(() => {
    setSingleProduct(id);
  }, []);

  function handleUpdate() {
    updateCart(state.order.id, product.id, 1)
  }

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
            <button onClick={() => handleUpdate()}>Add to Cart</button>
          </div>
          <div>
            <Link to={`/edit-product/${id}`}>
              <button>Edit Product</button>
            </Link>
          </div>
        </div>
      }
    </div>
  );
};

export default SingleProduct;
