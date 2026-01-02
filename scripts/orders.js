import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';
import {searchProduct} from './utils/searchProduct.js'
import {ordersClass, orders} from '../data/orders.js';


async function loadPage() {
  await loadProductsFetch();
  ordersClass();
  renderOrderSummary();
}

loadPage();

export function renderOrderSummary() {
  let orderHTML = '';

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format('MMMM, D');

    orderHTML += `
    <div class="order-container">    
      <div class="order-header">  
        <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
    
      <div class="order-details-grid">
        ${productsListHTML(order)}
      </div>
    </div>
    </div>
      </div>
    `;
  })

  function productsListHTML(order) {
    let productsListHTML = '';
    const products = order.getProducts();

    products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM, D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-it-again" data-product-id="${product.productId}"
          data-order-id="${order.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message"
            >Buy it again</span>
          </button>
        </div>

        <div class="product-actions js-tracking-button
        data-order-id="${order.id}
        data-product-id="${product.productId}">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
        </div>
    `;
    })

    return productsListHTML;
  }


  document.querySelector('.js-order-grid').innerHTML = orderHTML;
  
  document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();
  
  //press buy it again button
  document.querySelectorAll('.js-buy-it-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId, 1);
      document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();
    });
  });

  //search function
  //start search when click the search button
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const keyword = document.querySelector('.js-search-bar').value;
    searchProduct(keyword);
  });

  //start search when click enter
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      const keyword = document.querySelector('.js-search-bar').value;
      searchProduct(keyword);
    }
  });
}  