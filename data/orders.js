class Order {
  id;
  orderTime;
  totalCostCents;
  products;

  constructor(orderDetails) {
    this.id = orderDetails.id;
    this.orderTime = orderDetails.orderTime;
    this.totalCostCents = orderDetails.totalCostCents;
    this.products = orderDetails.products;
  }

  getOrderId() {
    return this.id;
  }

  getOrderTime() {
    return this.orderTime;
  }

  getTotalCostCents() {
    return this.totalCostCents;
  }

  getProducts() {
    return this.products;
  }
}

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function ordersClass() {
  orders = orders.map((orderDetails) => {
    return new Order(orderDetails);
  });
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function findOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if(orderId === order.id){
      matchingOrder = order;
    }
  });

  return matchingOrder;
}