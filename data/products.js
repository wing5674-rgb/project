import {formatCurrency} from '../scripts/utils/money.js';

export function getProduct (productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  type;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
    this.type = productDetails.type;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML() access the method in the parent class
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `
  }
}

export class Appliance extends Product{
  instructionLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML() access the method in the parent class
    return `
      <a href="${this.instructionLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      if(productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
        return new Product(productDetails);
    });

    console.log('load products');
  }).catch((error) => {
    console.log('unexpected error. Please try again later.');
  });

  return promise;
}