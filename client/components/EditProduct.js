import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { useForm } from 'react-hook-form';
import { ProductsContext, useProducts } from './ProductsProvider';
import history from '../history';

const EditProduct = ({ match }) => {
  const { id } = match.params;
  const state = useContext(ProductsContext);
  console.log(state);
  const { product, EditSingleProduct, setSingleProduct } = useProducts();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [inventory, setInventory] = useState(state.product.inventory);
  const [origin, setOrigin] = useState(state.product.origin);
  const [description, setDescription] = useState(state.product.description);
  useEffect(() => {
    setSingleProduct(id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    EditSingleProduct(id, {
      name,
      price,
      category,
      inventory,
      origin,
      description,
    });
    history.push(`/products/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <label>
        Price:
        <input
          type='text'
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
      </label>
      <label>
        Category:
        <input
          type='text'
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
      </label>
      <label>
        Inventory:
        <input
          type='text'
          value={inventory}
          onChange={(event) => {
            setInventory(event.target.value);
          }}
        />
      </label>
      <label>
        Origin:
        <input
          type='text'
          value={origin}
          onChange={(event) => {
            setOrigin(event.target.value);
          }}
        />
      </label>
      <label>
        Description:
        <input
          type='text'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default EditProduct;
