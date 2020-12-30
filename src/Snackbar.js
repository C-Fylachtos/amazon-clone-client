import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import LinProg from "./LinProg";
import "./Snackbar.css";

function Snackbar({ product: { id, image, price, remove, key } }) {
  const { enqueueSnackbar } = useSnackbar();

  const message = (
    <div className="snackbar__container">
      <LinProg />
      <h2>{remove ? "Removed from " : "Added to "}Basket</h2>
      <h4>Product ID: {id}</h4>
      <img src={image} alt="snackbar_product" />
      <p>
        <strong>${price}</strong>
      </p>
    </div>
  );

  useEffect(() => {
    if (id) {
      return (
        <div className="snackbar">
          {enqueueSnackbar(message, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: false,
            key: id,
            variant: remove ? "error" : "success",
            autoHideDuration: 3200,
          })}
        </div>
      );
    }
  });
  return null;
}

export default Snackbar;
