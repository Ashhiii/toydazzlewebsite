import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Helper function to calculate prices
const calculatePrices = (state) => {
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price, 0);
  state.shippingPrice = state.itemsPrice > 1000 ? 0 : 100;
  state.subtotal = state.itemsPrice - 0;
  state.totalPrice = state.subtotal + state.shippingPrice;
};

// Define the initial state of the cart, retrieving it from localStorage if available
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingInformation: {},
      paymentMethod: "COD",
      itemsPrice: 0,
      shippingPrice: 0,
      subtotal: 0,
      totalPrice: 0,
    };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                price: (item.quantity + newItem.quantity) * newItem.price,
              }
            : item
        );
      } else {
        state.cartItems.push({
          ...newItem,
          price: newItem.price * newItem.quantity,
          isEditing: false,
        });
      }

      calculatePrices(state);
      updateCart(state);
    },

    // Increase quantity
    increaseQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: (item.quantity + 1) * (item.price / item.quantity), // use unit price * new quantity
            }
          : item
      );
      calculatePrices(state);
      updateCart(state);
    },

    // Decrease quantity
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.price / item.quantity,
            }
          : item
      );

      calculatePrices(state);
      updateCart(state);
    },

    // Toggle edit mode
    toggleEditQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, isEditing: !item.isEditing }
          : item
      );
    },

    // Remove item
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      if (state.cartItems.length === 0) {
        state.cartItems = [];
        state.itemsPrice = 0;
        state.shippingPrice = 0;
        state.subtotal = 0;
        state.totalPrice = 0;
        localStorage.removeItem("cart");
      } else {
        calculatePrices(state);
        updateCart(state);
      }
    },

    // Clear cart after checkout
    clearCart(state) {
      state.cartItems = [];
      state.paymentMethod = "COD";
      state.shippingInformation = {};
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.subtotal = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleEditQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
