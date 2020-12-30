import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Snackbar from "./Snackbar";
import "./Product.css";

function Product({ id, title, image, price, rating }) {
  const [, dispatch] = useStateValue();
  const [showSnack, setShowSnack] = useState(false);

  const handleClick = () => {
    setShowSnack(true);
    setTimeout(() => setShowSnack(false), 3200);
    setTimeout(
      () =>
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          },
        }),
      1000
    );
    console.log("after dispatch", showSnack);
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="product" />
      <button onClick={handleClick}>Add to Basket</button>

      {showSnack && (
        <Snackbar
          product={{
            key: id,
            id: id,
            price: price,
            image: image,
          }}
        />
      )}
    </div>
  );
}

export default Product;
