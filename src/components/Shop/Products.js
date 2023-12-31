// import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {

  const DUMMY_PRODUCTS = [
    { id: "p1", title: "book", price: 6, description: "this is my first book" },
    {
      id: "p2",
      title: "pencil",
      price: 2,
      description: "this is my first pen",
    },
  ];


  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              id={item.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
