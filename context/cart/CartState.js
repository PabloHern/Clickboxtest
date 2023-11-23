import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_TO_CART, REMOVE_ITEM, SET_TYPES } from "../Types";

const CartState = ({ children }) => {
  const initalState = {
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initalState);

  const addToCart = (item) => {
    dispatch({
      type: ADD_TO_CART,
    });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM });
  };
  const setTypes = (price) => {
    dispatch({ type: SET_TYPES, payload: { price } });
  };
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products));
    state.total = state.products.reduce(
      (amount, item) => (item.type.unit_amount / 100) * item.quantity + amount,
      0,
    );
  }, [state.products]);
  return (
    <CartContext.Provider
      value={{
        products: state.products,
        total: state.total,
        addToCart,
        removeItem,
        setTypes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
