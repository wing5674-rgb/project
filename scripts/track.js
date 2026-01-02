import {orders, findOrder, ordersClass} from "../data/orders.js";
import {products, loadProductsFetch, getProduct} from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {searchProduct} from './utils/searchProduct.js'
import {cart} from "../data/cart-class.js";

async function loadPage() {
  await loadProductsFetch();
  ordersClass();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  const order = findOrder(orderId);
  const product = getProduct(productId);

  let productDetails = order.getProducts();
  productDetails.forEach((details) => {
    if(product.id === details.productId) {
      productDetails = details;
    }
  });

  const quantity = productDetails.quantity;
  const deliveryDate = productDetails.estimatedDeliveryTime;
  const productName = product.name;
  const image = product.image;

  let html = '';
  
  html = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dayjs(deliveryDate).format('dddd MMMM, D')}
      </div>

      <div class="product-info">
        ${productName}
      </div>

      <div class="product-info">
        Quantity: ${quantity}
      </div>

      <img class="product-image" src="${image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label js-shipped">
          Shipped
        </div>
        <div class="progress-label js-delivered">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-track-order').innerHTML = html;

  const progress = calculateProgress();

  const barWidth = document.querySelector('.progress-bar');
  barWidth.style.setProperty('width', `${progress}%`);

  if(progress > 50) {
    const shippedColor = document.querySelector('.js-shipped');
    shippedColor.classList.add('current-status');
  }
  if(progress >= 100) {
    const deliveryColor = document.querySelector('.js-delivered'); 
    deliveryColor.classList.add('finish-status');
  }

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
  })
  
  document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

  function calculateProgress() {
    const today = dayjs();
    const orderDay = order.getOrderTime();
    const deliveryDay = dayjs(deliveryDate);
    const percentProgress = ((today.diff(orderDay)) / (deliveryDay.diff(orderDay))) * 100;

    return percentProgress;
  }
};

loadPage();


