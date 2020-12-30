import React from "react";
import "./CheckoutProduct.css";

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
  deleteItem,
}) {
  return (
    <div className="checkoutProduct">
      <img src={image} alt="product" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={() => deleteItem(id)}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
