import { ADD_TO_CART, REMOVE_ITEM, SET_TYPES } from "../Types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      state.products[0].quantity += 1;
      return {
        ...state,
        products: state.products,
      };
    }
    case REMOVE_ITEM: {
      state.products[0].quantity -= 1;
      return {
        ...state,
        products: state.products,
      };
    }
    case SET_TYPES: {
      return {
        ...state,
        productTypes: state.products.push({
          type: action.payload.price,
          quantity: 0,
        }),
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
