import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const product = props.product;

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
      <div>{product.status}</div>
      <div className="single-product-description">{product.description}</div>
    </div>
  );
};

export default Product;
