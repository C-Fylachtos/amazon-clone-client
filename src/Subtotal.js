import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./Subtotal.css";

function Subtotal() {
  const history = useHistory();
  const [{ basket, discount }, dispatch] = useStateValue();
  const [openDiscount, setOpenDiscount] = useState(discount > 0);
  const [coupon, setCoupon] = useState("");
  const [disableInput, setDisableInput] = useState(discount > 0);
  const [checkedCoupon, setCheckedCoupon] = useState(false);
  // const [discount, setDiscount] = useState(0);

  const handleCheckBox = () => {
    if (openDiscount) {
      setOpenDiscount(false);
    } else {
      setOpenDiscount(true);
    }
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    if (coupon === "minus80") {
      dispatch({
        type: "SET_DISCOUNT",
        discount: 0.8,
      });
      setDisableInput(true);
    }
    setCheckedCoupon(true);
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input
                type="checkbox"
                defaultChecked={openDiscount}
                onClick={handleCheckBox}
              />
              {""}
              This order contains a gift
            </small>
            {openDiscount && (
              <div className="subtotal__discount">
                <input
                  className="subtotal__discountInput"
                  disabled={disableInput}
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                ></input>{" "}
                <button
                  className="subtotal__discountButton"
                  disabled={disableInput}
                  onClick={handleDiscount}
                >
                  Discount
                </button>
                {checkedCoupon &&
                  (discount > 0 ? (
                    <h5 className="subtotal__success">
                      Coupon verified! Discount: {discount * 100}%
                    </h5>
                  ) : (
                    <h5 className="subtotal__fail">Coupon is not valid!</h5>
                  ))}
              </div>
            )}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket, discount)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
