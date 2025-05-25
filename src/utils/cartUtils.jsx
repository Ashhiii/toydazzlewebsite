// utils/cartUtils.js
export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const discount = 250; // Optional
  const shippingPrice = itemsPrice > 0 ? 100 : 0;
  const subtotal = itemsPrice - discount;
  const totalPrice = subtotal + shippingPrice;

  const updatedState = {
    ...state,
    itemsPrice,
    subtotal,
    shippingPrice,
    totalPrice,
  };

  // Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedState));

  return updatedState;
};
