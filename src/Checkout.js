import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Snackbar from "./Snackbar";
import "./Checkout.css";

function Checkout() {
  const [{ basket, user, lastAction }, dispatch] = useStateValue();
  const [showing, setShowing] = useState(false);

  const deleteItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    setShowing(true);
    setTimeout(() => setShowing(false), 3200);
  };

  const basketList = basket.map((item) => {
    return (
      <CSSTransition key={item.key} timeout={500} classNames="transition__item">
        <CheckoutProduct
          id={item.id}
          image={item.image}
          price={item.price}
          title={item.title}
          rating={item.rating}
          deleteItem={deleteItem}
        />
      </CSSTransition>
    );
  });

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="checkout ad"
          className="checkout__ad"
        />
        <div className="">
          <h3>{user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          <TransitionGroup className="checkout__basketGroup">
            {basketList}
          </TransitionGroup>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
      {showing && (
        <Snackbar
          product={{
            id: lastAction.basketItem?.id,
            price: lastAction.basketItem?.price,
            image: lastAction.basketItem?.image,
            remove: true,
          }}
        />
      )}
    </div>
  );
}

export default Checkout;
