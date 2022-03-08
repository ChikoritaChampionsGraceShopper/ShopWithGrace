import axios from 'axios';
import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';
import history from '../history';

const SHOW_ALL_PRODUCTS = 'SHOW_ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const SHOW_FILTERED_PRODUCTS = 'SHOW_FILTERED_PRODUCTS'

export const ProductsContext = createContext();

export function useProducts() {
  const { products, isLoading, setisLoading, product, dispatch } =
    useContext(ProductsContext);
  const randomGenerator = () => {
    let randomItem = products[Math.floor(Math.random() * products.length)];
    return randomItem;
  };
  async function setSingleProduct(productId) {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    console.log(product)
    dispatch({
      type: SINGLE_PRODUCT,
      product,
    });
    setisLoading(false);
  }
  async function setFilteredProducts(category) {
    const { data: filteredProducts } = await axios.get(`/api/products/all/${category}`);
    console.log(product)
    dispatch({
      type: SHOW_FILTERED_PRODUCTS,
      filteredProducts,
    });
    setisLoading(false);
    // history.push(`/products/all/${category}`)
  }
  async function EditSingleProduct(productId, newProduct) {
    const { data: product } = await axios.put(
      `/api/products/${productId}`,
      newProduct
    );
    dispatch({
      type: EDIT_PRODUCT,
      product,
    });
  }

  async function deleteSingleProduct(productId) {
    const { data: product } = await axios.delete(`/api/products/${productId}`);
    dispatch({
      type: DELETE_PRODUCT,
      product,
    });
  }
  async function addSingleProduct(newProduct) {
    const { data: product } = await axios.post(`/api/products`, newProduct);
    dispatch({
      type: ADD_PRODUCT,
      product,
    });
  }

  let mapArr = [
    randomGenerator(),
    randomGenerator(),
    randomGenerator(),
    randomGenerator(),
  ];

  return {
    products,
    product,
    isLoading,
    mapArr,
    async fetchProducts() {
      const { data: products } = await axios.get('/api/products');
      dispatch({ type: SHOW_ALL_PRODUCTS, products });
      setisLoading(false);
    },
    setFilteredProducts,
    EditSingleProduct,
    setSingleProduct,
    deleteSingleProduct,
    addSingleProduct,
  };
}

const reducer = (state, action) => {
  console.log('state: ', state);
  console.log('action: ', action);
  switch (action.type) {
    case SHOW_ALL_PRODUCTS: {
      return { ...state, products: action.products };
    }
    case SHOW_FILTERED_PRODUCTS: {
      return { ...state, filteredProducts: action.filteredProducts }
    }
    case SINGLE_PRODUCT: {
      return { ...state, product: action.product };
    }
    case EDIT_PRODUCT: {
      return { ...state, product: action.product };
    }
    case DELETE_PRODUCT: {
      return state.filter((product) => product.id !== action.product.id);
    }
    case ADD_PRODUCT: {
      return { ...state, product: action.product };
    }
    default:
      return state;
  }
};

const initialState = { products: [], product: {} };

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setisLoading] = useState(true);

  const contextValue = {
    ...state,
    dispatch,
    setisLoading,
    isLoading,
  };
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}
