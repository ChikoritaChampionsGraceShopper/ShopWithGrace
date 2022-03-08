import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props);
  const product = props.product;
  let id = 0;
  const isLoggedIn = useSelector((state) => {
    id = state.auth.id;
    return !!state.auth.id;
  });
  const dispatch = useDispatch();

  return (
    <div key={product.id} className="productContainer">
      <div className="single-product-img">
        <img src={product.image} style={{ width: "200px", height: "200px" }} />
      </div>
      <div className="single-product-name">{product.name}</div>
      <div className="single-product-price">Price: ${product.price}</div>
      <div className="single-product-origin">
        Country of origin: {product.origin}
      </div>
      <div>Type of tea: {product.category}</div>
      <div className="single-product-description">{product.description}</div>
    </div>
  );
};

export default Product;
