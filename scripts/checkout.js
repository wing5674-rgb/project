import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProductsFetch, products} from '../data/products.js';
import {loadCartFetch} from '../data/cart-class.js';

async function loadCheckoutPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])

  } catch(error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
}
  
loadCheckoutPage();