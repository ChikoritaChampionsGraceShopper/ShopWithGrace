import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useProducts } from "./ProductsProvider";
import Product from "./Product";
import { CartContext } from "./Cart/CartProvider";

const AllProducts = () => {
  const { products, isLoading, setSingleProduct } = useProducts();
  const { addToCart } = useContext(CartContext);
  // console.log('products: ', products)
  return (
    <div className="allProductsContainer">
      {isLoading ? (
        <div className="loading">Loading Products...</div>
      ) : (
        products.map((product) => (
          <div className="productCardOutline" key={product.id}>
            <div>
              <Product product={product} key={product.id} />
            </div>
            <div className="view-product-button">
              <Link
                to={`/products/${product.id}`}
                onClick={() => setSingleProduct(product.id)}
              >
                <button>View Product</button>
              </Link>
            </div>
            <div className="all-products-addToCart">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProducts;
