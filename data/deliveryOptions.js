import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  }, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    };
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();
  let dayNumber = deliveryDate.day();
  let remainingDeliveryDay = deliveryOption.deliveryDays;

  while (remainingDeliveryDay > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    dayNumber = deliveryDate.day();
    if (dayNumber !== 6 && dayNumber !== 0) {
      remainingDeliveryDay --;
    };
  };

  return deliveryDate.format('dddd, MMMM D');
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      found = true;
    }
  });

  return found;
};