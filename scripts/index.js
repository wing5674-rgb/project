import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js';
import {searchProduct} from './utils/searchProduct.js'

async function loadProductPage() {
  try {
   // throw 'error-test';
    await loadProductsFetch();
  } catch (error) {
    console.log(error);
    alert('Unexpected error. Please try again later.');
  }
  
  renderProductsGrid();
};

loadProductPage();

export async function renderProductsGrid() {
  //create the main content
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  let filterdProducts = products;
  
  if(search) {    
    const searchCase = search.toLocaleLowerCase();

    filterdProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if(keyword.toLowerCase().includes(searchCase)) {
          matchingKeyword = true;
        };
      });

      return matchingKeyword || product.name.toLowerCase().includes(searchCase);;
    });

    if(!filterdProducts[0]) {
      alert('No matched product found. Please try again.');
    }
  }

  let productsHTML = '';
  
  filterdProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  //create the main content

  updateCartNumberDisplay(); 

  //when press add to chart button
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const selectedQuantity = Number(quantitySelector.value);

        cart.addToCart(productId, selectedQuantity);
        updateCartNumberDisplay();
        addedMessage(productId); //displayed the added message
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
  })

  //display the added message
  let addedMessageTimeoutId = {};

  function addedMessage(productId) {   
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');
    
    if (addedMessageTimeoutId[productId]) {
      clearTimeout(addedMessageTimeoutId[productId]);
    };

    addedMessageTimeoutId[productId] = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);
  }

  function updateCartNumberDisplay() {
    document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();
  }
}

