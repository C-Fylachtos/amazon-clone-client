export const initialState = {
  basket: [],
  user: null,
  lastAction: {
    name: null,
    basketItem: null,
  },
  discount: 0,
};

export const getBasketTotal = (basket, discount) => {
  var result = basket?.reduce((amount, item) => item.price + amount, 0);
  result = result - result * discount;
  result = +result.toFixed(2);
  return result;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let tempItem = state.basket[index];
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove Product with ID of ${action.id} as its not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
        lastAction: {
          name: "REMOVE",
          basketItem: tempItem,
        },
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_DISCOUNT":
      return {
        ...state,
        discount: action.discount,
      };
    default:
      return state;
  }
};

export default reducer;
