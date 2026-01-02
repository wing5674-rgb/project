import {cart} from "../../data/cart-class.js";

export function renderCheckoutHeader() {
  let headerHTML = '';
  
  const cartQuantity = cart.calculateCartQuantity();

  headerHTML += `
    <div class="checkout-header">
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img class="amazon-logo" src="images/home-icon-2.png">
            <img class="amazon-mobile-logo" src="images/home-icon-2.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-checkout-test"
          href="index.html">${cartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
  `;

  document.querySelector('.js-checkout-header').innerHTML = headerHTML;
};