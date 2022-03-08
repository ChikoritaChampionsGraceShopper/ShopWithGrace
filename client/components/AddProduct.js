import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useForm } from 'react-hook-form';
import { useProducts } from './ProductsProvider';

const AddProduct = () => {
  const { addSingleProduct } = useProducts();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');
  const [origin, setOrigin] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addSingleProduct({
      name,
      price,
      category,
      inventory,
      origin,
      description,
    });
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

export default AddProduct;
