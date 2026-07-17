// ======================================================
// Validate Checkout
// ======================================================

export const validateCheckout = ({
  cart,
  selectedAddress,
  paymentMethod,
}) => {

  // ======================================================
  // Cart Exists
  // ======================================================

  if (!cart) {
    return "Cart not found.";
  }

  // ======================================================
  // Cart Has Items
  // ======================================================

  if (!cart.items || cart.items.length === 0) {
    return "Your cart is empty.";
  }

  // ======================================================
  // Address Selected
  // ======================================================

  if (!selectedAddress) {
    return "Please select a delivery address.";
  }

  // ======================================================
  // Payment Method
  // ======================================================

  if (!paymentMethod) {
    return "Please select a payment method.";
  }

  // ======================================================
  // Grand Total Validation
  // ======================================================

  if (Number(cart.grand_total) <= 0) {
    return "Invalid order total.";
  }

  return null;

};