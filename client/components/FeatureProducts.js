// import React from 'react';
// import ProductProvider, { useProducts } from './ProductsProvider';

// const randomGenerator = () => {
//   const { products, isLoading } = useProducts();
//   let randomItem = products[Math.floor(Math.random() * products.length)];
//   return randomItem;
// };

// const randomArr = () => {
//   let mapArr = [
//     randomGenerator(),
//     randomGenerator(),
//     randomGenerator(),
//     randomGenerator(),
//   ];
// };

// const FeaturedProducts = () => {
//   const { products, isLoading } = useProducts();
//   return (
//     <div id='products' className='column'>
//       {isLoading ? (
//         <div className='loading'>Loading Products...</div>
//       ) : (
//         <div>{randomArr()}</div>
//       )}
//     </div>
//   );
// };

// export default FeaturedProducts;
